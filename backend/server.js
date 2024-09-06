const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const db = require('./config/db');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { exec } = require('child_process');

const app = express();
const port = 3000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for handling sessions and cookies
app.use(cookieParser());
app.use(session({
    secret: 'your_secret_key', // Replace with your secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Connect to MongoDB
mongoose.connect(db.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Define CodeSnippet Schema and Model
const codeSnippetSchema = new mongoose.Schema({
    code: String,
});

const CodeSnippet = mongoose.model('CodeSnippet', codeSnippetSchema);

// API endpoint to save a code snippet
app.post('/api/save-code', async (req, res) => {
    const { code } = req.body;

    try {
        const newSnippet = new CodeSnippet({ code });
        await newSnippet.save();
        res.status(200).json({ message: 'Code snippet saved successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error saving code snippet' });
    }
});

// Route to trigger plagiarism checking
app.get('/api/compare-snippets', (req, res) => {
    exec('python backend/scripts/compare_snippets.py', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing script: ${error.message}`);
            return res.status(500).send('Error executing script');
        }
        if (stderr) {
            console.error(`Script stderr: ${stderr}`);
            return res.status(500).send('Script error');
        }
        console.log(`Script output: ${stdout}`);
        res.send(`Plagiarism check result: ${stdout}`);
    });
});

// Route to handle logout
app.post('/api/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Failed to logout');
        }
        res.clearCookie('connect.sid'); // Clear the session cookie
        res.status(200).send('Logged out');
    });
});

// Route handlers for authentication and app-specific routes
app.use('/api/auth', authRoutes);

// Serve static files from the 'frontend' directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Serve the login page as the default route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/pages/login.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

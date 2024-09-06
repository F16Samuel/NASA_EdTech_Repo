const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const appRoutes = require('./routes/appRoutes');
const db = require('./config/db');

const app = express();
const port = 3000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Route handlers for authentication and app-specific routes
app.use('/api/auth', authRoutes);
app.use('/api/app', appRoutes);

// Serve static files from the 'frontend' directory
app.use(express.static(path.join(__dirname, 'frontend')));

// Serve the login page as the default route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'login.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
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

// Route to compare code snippets
app.post('/api/compare-snippets', async (req, res) => {
    const { snippet1, snippet2 } = req.body;

    if (!snippet1 || !snippet2) {
        return res.status(400).json({ error: 'Both code snippets are required' });
    }

    // Write the snippets to temporary files
    const tempFile1 = path.join(__dirname, 'temp1.txt');
    const tempFile2 = path.join(__dirname, 'temp2.txt');

    try {
        fs.writeFileSync(tempFile1, snippet1);
        fs.writeFileSync(tempFile2, snippet2);

        // Execute the Python script
        exec(`python backend/scripts/compare_snippets.py ${tempFile1} ${tempFile2}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing script: ${error.message}`);
                return res.status(500).json({ error: 'Error executing script' });
            }
            if (stderr) {
                console.error(`Script stderr: ${stderr}`);
                return res.status(500).json({ error: 'Script error' });
            }
            // Output from the Python script
            res.json({ result: stdout.trim() });
        });
    } catch (error) {
        res.status(500).json({ error: 'Error writing temporary files' });
    } finally {
        // Clean up temporary files
        fs.unlinkSync(tempFile1);
        fs.unlinkSync(tempFile2);
    }
});

// Route handlers for authentication and app-specific routes
app.use('/api/auth', authRoutes);
app.use('/api/app', appRoutes);

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

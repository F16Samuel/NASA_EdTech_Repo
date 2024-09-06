app.post('/api/save-code', async (req, res) => {
    const { code } = req.body;
    
    try {
        if (!code) {
            return res.status(400).json({ error: 'Code is required' });
        }

        const newSnippet = new CodeSnippet({ code });
        await newSnippet.save();
        res.status(200).json({ message: 'Code snippet saved successfully' });
    } catch (error) {
        console.error('Error saving code snippet:', error);
        res.status(500).json({ error: 'Error saving code snippet' });
    }
});

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // For parsing application/json

// Define the route
app.post('/api/save-code', (req, res) => {
    const code = req.body.code;
    // Logic to handle the received code
    console.log(code);
    res.status(200).send('Code received');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

const express = require('express');
const router = express.Router();
const Submission = require('../models/Submission');

// Function to check plagiarism
async function checkPlagiarism(code) {
  try {
    // Check for exact matches
    const result = await Submission.findOne({ code: { $regex: code, $options: 'i' } });

    if (result) {
      return { isPlagiarized: true, message: "Plagiarized Code!!" };
    } else {
      // Additional checks for variable renaming or structural similarity can be implemented here
      return { isPlagiarized: false, message: "Original Code!!" };
    }
  } catch (error) {
    console.error('Error checking plagiarism:', error);
    throw new Error('Error checking plagiarism');
  }
}

// Route to handle code submission
router.post('/submit', async (req, res) => {
  const { code } = req.body;

  try {
    const result = await checkPlagiarism(code);
    res.json(result);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    submissionDate: { type: Date, default: Date.now },
    code: { type: String, required: true },
});

module.exports = mongoose.model('Submission', SubmissionSchema);

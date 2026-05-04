const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String },
    image: { type: String },
    link: { type: String },
    year: { type: String },
    industry: { type: String },
    client: { type: String },
    duration: { type: String },
    problem: { type: String },
    solution: { type: String },
    challenge: { type: String },
    summary: { type: String },
    gallery: [{ type: String }],
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);

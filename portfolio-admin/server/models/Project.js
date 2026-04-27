const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String },
    image: { type: String },
    link: { type: String },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);

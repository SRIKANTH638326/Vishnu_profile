const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    category: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    pct: { type: Number, default: 0 },
    color: { type: String, default: "#6366f1" },
    icon: { type: String }, // e.g. "FiZap" or an image URL
    isHot: { type: Boolean, default: false }, // For the green dot
    order: { type: Number, default: 0 }
});

module.exports = mongoose.model('Skill', skillSchema);

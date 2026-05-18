const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, default: "Default" },
    features: [String]
}, { timestamps: true });

module.exports = mongoose.model('Service', ServiceSchema);

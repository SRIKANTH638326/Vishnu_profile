const mongoose = require('mongoose');

const SocialConnectionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    platform: { type: String, required: true },
    url: { type: String, required: true },
    icon: { type: String, default: "Globe" }
}, { timestamps: true });

module.exports = mongoose.model('SocialConnection', SocialConnectionSchema);

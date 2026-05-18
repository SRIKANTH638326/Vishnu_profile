const mongoose = require('mongoose');

const SectionImagesSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    hero: { type: String, default: '' },        // Hero portrait
    about: { type: String, default: '' },       // About section
    contact: { type: String, default: '' },     // Contact section
    services: { type: String, default: '' },    // Services section
    skills: { type: String, default: '' },      // Tech Stack section
    experience: { type: String, default: '' },  // Experience section
    og: { type: String, default: '' },          // OG/Social share image
}, { timestamps: true });

module.exports = mongoose.model('SectionImages', SectionImagesSchema);

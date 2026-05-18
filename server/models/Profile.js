const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    // General Info
    fullName: { type: String, default: 'Srikanth' },
    jobTitle: { type: String, default: 'Full Stack Developer & AI Enthusiast' },
    bio: { type: String, default: 'Hi, I\'m Srikanth — a digital designer and Framer developer passionate about crafting meaningful and impactful digital experiences.' },
    profileImage: { type: String, default: '' },
    aboutImage: { type: String, default: '' },
    ogImage: { type: String, default: '' },
    contactImage: { type: String, default: '' },
    servicesImage: { type: String, default: '' },
    skillsImage: { type: String, default: '' },
    experienceImage: { type: String, default: '' },
    
    // Hero Section Content
    heroTitle1: { type: String, default: 'Digital' },
    heroTitle2: { type: String, default: 'Designer' },
    heroBubbleText: { type: String, default: 'Hi' },
    
    // Stats Info
    yearsOfExperience: { type: String, default: '12' },
    completedProjects: { type: String, default: '270' },
    clientsWorldwide: { type: String, default: '50+' },
    
    // Contact Info
    phone: { type: String, default: '+91 9390234567' },
    email: { type: String, default: 'srikanthc061@gmail.com' },
    location: { type: String, default: 'Chennai, India' },
    
    // SEO & Global Settings
    siteTitle: { type: String, default: 'Srikanth | Portfolio' },
    metaDescription: { type: String, default: 'Portfolio of Srikanth, a digital designer and Framer developer.' },
    googleAnalyticsId: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Profile', ProfileSchema);

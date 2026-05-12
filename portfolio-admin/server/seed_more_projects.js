const mongoose = require('mongoose');
const Project = require('./models/Project');
require('dotenv').config();

const projectsToSeed = [
    {
        title: "SUMMER VIBES FESTIVAL CAMPAIGN",
        description: "Created promotional materials for the \"Summer Vibes Festival,\" including posters, flyers, and social media graphics.",
        category: "Graphic Design",
        image: "festival.png",
        isMoreProject: true
    },
    {
        title: "CORAL SPIRAL ABSTRACT",
        description: "A visually striking 3D abstract artwork featuring a coral-colored spiral form with smooth, flowing curves and a soft pink gradient background.",
        category: "Branding",
        image: "abstract.png",
        isMoreProject: true
    },
    {
        title: "CYBERPUNK INTERFACE HUD",
        description: "Futuristic user interface design with holographic blueprints and intricate data visualizations for a mission-critical tech platform.",
        category: "UI/UX",
        image: "cyberpunk.png",
        isMoreProject: true
    },
    {
        title: "MINIMALIST VOGUE PACKAGING",
        description: "High-end cosmetic packaging design focusing on elegant typography, neutral palettes, and a sophisticated minimalist aesthetic.",
        category: "Product Design",
        image: "packaging.png",
        isMoreProject: true
    }
];

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio');
        
        for (const p of projectsToSeed) {
            const exists = await Project.findOne({ title: p.title });
            if (!exists) {
                await new Project(p).save();
                console.log(`Seeded: ${p.title}`);
            } else {
                console.log(`Skipped (already exists): ${p.title}`);
            }
        }
        
        console.log('Seeding complete.');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seed();

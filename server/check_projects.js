const mongoose = require('mongoose');
const Project = require('./models/Project');
require('dotenv').config();

const checkProjects = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio');
        const projects = await Project.find();
        console.log('--- Projects in DB ---');
        projects.forEach(p => {
            console.log(`Title: ${p.title} | isMoreProject: ${p.isMoreProject} | isFeatured: ${p.isFeatured} | github: ${p.githubLink} | external: ${p.externalLink}`);
        });
        console.log('----------------------');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkProjects();

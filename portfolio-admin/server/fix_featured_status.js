const mongoose = require('mongoose');
const Project = require('./models/Project');
require('dotenv').config();

const update = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio');
        
        // Mark all non-more projects as featured
        const res = await Project.updateMany(
            { isMoreProject: { $ne: true } },
            { $set: { isFeatured: true } }
        );
        
        console.log(`Updated ${res.modifiedCount} projects to be featured.`);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

update();

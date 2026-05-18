const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const checkUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio');
        const users = await User.find({}, 'email role');
        console.log('--- Registered Users ---');
        users.forEach(u => console.log(`Email: ${u.email} | Role: ${u.role}`));
        console.log('------------------------');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkUsers();

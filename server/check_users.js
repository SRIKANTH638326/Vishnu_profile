const mongoose = require('mongoose');
const User = require('./models/User');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const checkUsers = async () => {
    try {
        const mongoUri = process.env.MONGO_URI || 'mongodb+srv://srikanthc061_db_user:Srikanth2026@cluster0.2nmsyge.mongodb.net/portfolioDB?retryWrites=true&w=majority';
        await mongoose.connect(mongoUri);
        const users = await User.find({}, 'email role');
        console.log('--- Registered Users ---');
        if (users.length === 0) {
            console.log('No users registered in the database.');
        } else {
            users.forEach(u => console.log(`Email: ${u.email} | Role: ${u.role}`));
        }
        console.log('------------------------');
        process.exit(0);
    } catch (err) {
        console.error("❌ checkUsers error:", err.message);
        process.exit(1);
    }
};

checkUsers();

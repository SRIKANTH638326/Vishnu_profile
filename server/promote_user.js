const mongoose = require('mongoose');
const User = require('./models/User');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const promote = async (email) => {
    try {
        const mongoUri = process.env.MONGO_URI || 'mongodb+srv://srikanthc061_db_user:Srikanth2026@cluster0.2nmsyge.mongodb.net/portfolioDB?retryWrites=true&w=majority';
        await mongoose.connect(mongoUri);
        const user = await User.findOneAndUpdate(
            { email: { $regex: new RegExp(`^${email.toLowerCase().trim()}$`, 'i') } },
            { role: 'admin' },
            { new: true }
        );
        if (user) {
            console.log(`✅ User ${email} has been promoted to ADMIN.`);
        } else {
            console.log(`⚠️ User ${email} not found.`);
        }
        process.exit(0);
    } catch (err) {
        console.error("❌ Promote error:", err.message);
        process.exit(1);
    }
};

promote('admin@example.com');

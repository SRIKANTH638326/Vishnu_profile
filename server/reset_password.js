const mongoose = require('mongoose');
const User = require('./models/User');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const resetPassword = async (email, newPassword) => {
    try {
        const mongoUri = process.env.MONGO_URI || 'mongodb+srv://srikanthc061_db_user:Srikanth2026@cluster0.2nmsyge.mongodb.net/portfolioDB?retryWrites=true&w=majority';
        await mongoose.connect(mongoUri);
        
        const targetEmail = email.toLowerCase().trim();
        let user = await User.findOne({ email: { $regex: new RegExp(`^${targetEmail}$`, 'i') } });
        
        if (user) {
            user.password = newPassword; // The pre-save hook will hash it
            user.role = 'admin';
            await user.save();
            console.log(`✅ Password for ${email} has been updated to: ${newPassword} (Role: admin)`);
        } else {
            user = new User({
                email: targetEmail,
                password: newPassword,
                role: 'admin'
            });
            await user.save();
            console.log(`✅ Admin account created: ${email} with password: ${newPassword}`);
        }
        process.exit(0);
    } catch (err) {
        console.error("❌ Reset password failed:", err.message);
        process.exit(1);
    }
};

resetPassword('admin@example.com', 'admin123');

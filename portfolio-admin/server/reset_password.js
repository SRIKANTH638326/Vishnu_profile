const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const resetPassword = async (email, newPassword) => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio');
        const user = await User.findOne({ email });
        if (user) {
            user.password = newPassword; // The pre-save hook will hash it
            await user.save();
            console.log(`Password for ${email} has been reset to: ${newPassword}`);
        } else {
            console.log(`User ${email} not found.`);
        }
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

resetPassword('admin@example.com', 'admin123');

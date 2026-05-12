const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const promote = async (email) => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio');
        const user = await User.findOneAndUpdate({ email }, { role: 'admin' }, { new: true });
        if (user) {
            console.log(`User ${email} has been promoted to ADMIN.`);
        } else {
            console.log(`User ${email} not found.`);
        }
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

promote('admin@example.com');

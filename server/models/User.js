const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, { timestamps: true });

// Hash password before saving
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function(candidatePassword) {
    if (!this.password) return false;
    try {
        if (!this.password.startsWith('$2a$') && !this.password.startsWith('$2b$')) {
            return candidatePassword === this.password;
        }
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (err) {
        console.error("comparePassword error:", err);
        return candidatePassword === this.password;
    }
};

module.exports = mongoose.model('User', UserSchema);

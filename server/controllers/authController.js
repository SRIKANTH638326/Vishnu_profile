const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) => {
    const { email, password, role } = req.body;

    try {
        // Check if requester is admin
        const userCount = await User.countDocuments();
        if (userCount > 0) {
            const token = req.header('Authorization')?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ success: false, message: "Authorization required to create users" });
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const requester = await User.findById(decoded.id);
            if (!requester || requester.role !== 'admin') {
                return res.status(403).json({ success: false, message: "Only admins can create new users" });
            }
        }

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        user = new User({ email, password, role: role || 'user' });
        await user.save();

        // Dynamically clear all portfolio data so the new user starts with a 100% clean website
        const Project = require('../models/Project');
        const Skill = require('../models/Skill');
        const Experience = require('../models/Experience');
        const Service = require('../models/Service');
        const Blog = require('../models/Blog');
        const Message = require('../models/Message');

        await Promise.all([
            Project.deleteMany({}),
            Skill.deleteMany({}),
            Experience.deleteMany({}),
            Service.deleteMany({}),
            Blog.deleteMany({}),
            Message.deleteMany({})
        ]);
        console.log("🧹 Clean Slate: Successfully wiped all old portfolio data for the new user's website.");

        res.status(201).json({ success: true, message: "User created successfully with a clean slate website" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Login user
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({ 
            success: true, 
            token, 
            user: {
                id: user._id,
                email: user.email,
                role: user.role
            },
            message: "Login successful" 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "User deleted" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

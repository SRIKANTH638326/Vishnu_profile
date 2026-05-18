const Profile = require('../models/Profile');

exports.getProfile = async (req, res) => {
    try {
        const { user } = req.query;
        const query = user ? { user } : {};

        let profile = await Profile.findOne(query);
        
        if (!profile && user) {
            // Dynamically initialize with defaults if not found
            profile = new Profile({ user });
            await profile.save();
        }
        
        if (!profile) {
            return res.status(404).json({ message: "No profile found" });
        }

        res.json(profile);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        let profile = await Profile.findOne({ user: req.user.id });
        if (!profile) {
            profile = new Profile({ ...req.body, user: req.user.id });
        } else {
            Object.assign(profile, req.body);
        }
        const saved = await profile.save();
        res.json(saved);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

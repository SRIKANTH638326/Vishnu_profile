const Profile = require('../models/Profile');

exports.getProfile = async (req, res) => {
    try {
        const { user } = req.query;
        if (!user) {
            return res.status(400).json({ message: "User query parameter is required" });
        }

        let profile = await Profile.findOne({ user });
        if (!profile) {
            // Dynamically initialize with defaults if not found
            profile = new Profile({ user });
            await profile.save();
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

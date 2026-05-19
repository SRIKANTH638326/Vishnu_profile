const Experience = require('../models/Experience');
const Profile = require('../models/Profile');

exports.getAllExperience = async (req, res) => {
    try {
        const { user } = req.query;
        let query = {};
        if (user) {
            query = { user };
        } else {
            const profile = await Profile.findOne({});
            if (profile && profile.user) {
                query = { user: profile.user };
            }
        }
        const experience = await Experience.find(query).sort({ createdAt: -1 });
        res.json(experience);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createExperience = async (req, res) => {
    const experience = new Experience({ ...req.body, user: req.user.id });
    try {
        const newExperience = await experience.save();
        res.status(201).json(newExperience);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateExperience = async (req, res) => {
    try {
        const updatedExperience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedExperience);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteExperience = async (req, res) => {
    try {
        await Experience.findByIdAndDelete(req.params.id);
        res.json({ message: "Experience deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

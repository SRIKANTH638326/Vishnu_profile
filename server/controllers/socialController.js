const SocialConnection = require('../models/SocialConnection');

exports.getAllSocials = async (req, res) => {
    try {
        const { user } = req.query;
        const query = user ? { user } : {};
        const socials = await SocialConnection.find(query).sort({ createdAt: 1 });
        res.json(socials);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createSocial = async (req, res) => {
    try {
        const social = new SocialConnection({
            ...req.body,
            user: req.user.id
        });
        const saved = await social.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateSocial = async (req, res) => {
    try {
        const updated = await SocialConnection.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            req.body,
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: "Social connection not found or unauthorized" });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteSocial = async (req, res) => {
    try {
        const deleted = await SocialConnection.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if (!deleted) return res.status(404).json({ message: "Social connection not found or unauthorized" });
        res.json({ message: "Social connection deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const SectionImages = require('../models/SectionImages');

// GET /api/images  — public, no auth
exports.getImages = async (req, res) => {
    try {
        const { user } = req.query;
        const query = user ? { user } : {};
        let images = await SectionImages.findOne(query);
        if (!images) {
            // Return empty defaults so frontend never gets null
            images = {
                hero: '', about: '', contact: '',
                services: '', skills: '', experience: '', og: ''
            };
        }
        res.json(images);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// PUT /api/images  — protected, requires auth token
exports.updateImages = async (req, res) => {
    try {
        const allowed = ['hero', 'about', 'contact', 'services', 'skills', 'experience', 'og'];
        const update = {};
        allowed.forEach(field => {
            if (req.body[field] !== undefined) {
                update[field] = req.body[field];
            }
        });

        const images = await SectionImages.findOneAndUpdate(
            { user: req.user.id },
            { $set: { ...update, user: req.user.id } },
            { new: true, upsert: true, runValidators: true }
        );
        res.json(images);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

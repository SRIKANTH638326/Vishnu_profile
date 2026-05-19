const Service = require('../models/Service');
const Profile = require('../models/Profile');

exports.getAllServices = async (req, res) => {
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
        const services = await Service.find(query).sort({ createdAt: -1 });
        res.json(services);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createService = async (req, res) => {
    const service = new Service({ ...req.body, user: req.user.id });
    try {
        const newService = await service.save();
        res.status(201).json(newService);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateService = async (req, res) => {
    try {
        const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedService);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteService = async (req, res) => {
    try {
        await Service.findByIdAndDelete(req.params.id);
        res.json({ message: "Service deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

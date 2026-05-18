const Project = require('../models/Project');

exports.getAllProjects = async (req, res) => {
    try {
        const { user } = req.query;
        const query = user ? { user } : {};
        const projects = await Project.find(query);
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getFeaturedProjects = async (req, res) => {
    try {
        const { user } = req.query;
        const query = user ? { isFeatured: true, user } : { isFeatured: true };
        const projects = await Project.find(query);
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMoreProjects = async (req, res) => {
    try {
        const { user } = req.query;
        const query = user ? { isMoreProject: true, user } : { isMoreProject: true };
        const projects = await Project.find(query);
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createProject = async (req, res) => {
    // Associate the new project with the logged in user
    const project = new Project({ ...req.body, user: req.user.id });
    try {
        const newProject = await project.save();
        res.status(201).json(newProject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: "Project not found" });
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateProject = async (req, res) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedProject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteProject = async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

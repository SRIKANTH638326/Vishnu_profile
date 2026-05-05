const express = require('express');
const router = express.Router();
const { getAllProjects, createProject, updateProject, deleteProject } = require('../controllers/projectController');

const upload = require('../middleware/upload');

const auth = require('../middleware/authMiddleware');

router.get('/', getAllProjects);
router.post('/', auth, createProject);
router.put('/:id', auth, updateProject);
router.delete('/:id', auth, deleteProject);

// Image Upload Route
router.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: err });
        }
        if (req.file == undefined) {
            return res.status(400).json({ message: 'No file selected!' });
        }
        res.status(200).json({
            message: 'File uploaded!',
            url: `http://localhost:5000/uploads/${req.file.filename}`
        });
    });
});

module.exports = router;

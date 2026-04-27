const express = require('express');
const router = express.Router();
const { getAllProjects, createProject } = require('../controllers/projectController');

router.get('/', getAllProjects);
router.post('/', createProject);

module.exports = router;

const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');
const auth = require('../middleware/authMiddleware');

router.get('/', imageController.getImages);         // public
router.put('/', auth, imageController.updateImages); // protected

module.exports = router;

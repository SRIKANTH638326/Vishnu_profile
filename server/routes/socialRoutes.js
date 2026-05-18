const express = require('express');
const router = express.Router();
const socialController = require('../controllers/socialController');
const auth = require('../middleware/authMiddleware');

router.get('/', socialController.getAllSocials);
router.post('/', auth, socialController.createSocial);
router.put('/:id', auth, socialController.updateSocial);
router.delete('/:id', auth, socialController.deleteSocial);

module.exports = router;

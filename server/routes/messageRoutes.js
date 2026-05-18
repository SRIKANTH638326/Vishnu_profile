const express = require('express');
const router = express.Router();
const { getAllMessages, createMessage } = require('../controllers/messageController');

const auth = require('../middleware/authMiddleware');

router.get('/', auth, getAllMessages);
router.post('/', createMessage);

module.exports = router;

var express = require('express');
const ChatBot = require('../controllers/GeminiController');
const router = express.Router();

router.post('/chat',ChatBot);


module.exports = router;


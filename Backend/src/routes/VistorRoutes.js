var express = require('express');
const VistorNumber = require('../controllers/VistorController');  // ✅ Fix: Import function, not file
const router = express.Router();

router.get('/visitor', VistorNumber);  // ✅ Fix: Pass the function, not an object

module.exports = router;

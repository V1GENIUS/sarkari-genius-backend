const express = require('express');
const router = express.Router();
const { incrementVisitorCount } = require('../controllers/visitorController');

router.post('/visitor', incrementVisitorCount);

module.exports = router;

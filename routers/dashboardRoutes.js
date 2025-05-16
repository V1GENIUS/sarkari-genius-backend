const express = require('express');
const { getDashboardData } = require('../controllers/dashboardController');
const router = express.Router();

// Dashboard data route
router.get('/', getDashboardData);

module.exports = router;

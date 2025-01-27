const express = require("express");
const router = express.Router();
const { logAnalytics, getAnalytics } = require("../controllers/analyticsController");

// Route to log analytics
router.post("/log", logAnalytics);

// Route to get analytics data
router.get("/data", getAnalytics);

module.exports = router;

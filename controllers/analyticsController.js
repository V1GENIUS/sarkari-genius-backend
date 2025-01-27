const Analytics = require("../models/analyticsModel");

// Log user analytics
const logAnalytics = async (req, res) => {
  try {
    const { ip, userAgent, jobId, visitedAt } = req.body;

    const newAnalytics = new Analytics({
      ip,
      userAgent,
      jobId,
      visitedAt,
    });

    await newAnalytics.save();

    res.status(201).json({ message: "Analytics logged successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to log analytics", error });
  }
};

// Get analytics data
const getAnalytics = async (req, res) => {
  try {
    const analyticsData = await Analytics.find().sort({ visitedAt: -1 }); // Sorted by latest visits
    res.status(200).json(analyticsData);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch analytics data", error });
  }
};

module.exports = { logAnalytics, getAnalytics };

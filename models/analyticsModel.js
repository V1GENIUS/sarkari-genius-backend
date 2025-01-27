const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema({
  ip: { type: String, required: true },
  userAgent: { type: String, required: true },
  jobId: { type: String, required: true },
  visitedAt: { type: Date, default: Date.now },
});

const Analytics = mongoose.model("Analytics", analyticsSchema);

module.exports = Analytics;

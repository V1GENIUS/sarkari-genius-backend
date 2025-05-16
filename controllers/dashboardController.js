const Job = require('../models/Job');
const GovtRequestForm = require('../models/GovtRequestForm');
const User = require('../models/userModel');
const PrivateJobs = require('../models/PrivateJobs')

// Dashboard summary API
const getDashboardData = async (req, res) => {
  try {
    // Get total jobs
    const totalGovtJobs = await Job.countDocuments();
    // Get total private jobs
    const totalPrivateJobs = await PrivateJobs.countDocuments(); // Assuming you have a `type` field in Job model
    // Get total government jobs
    const totalRequestForm = await GovtRequestForm.countDocuments(); // Similarly assuming a `type` field
    // Get total users
    const totalUsers = await User.countDocuments();

    // Send the response
    res.status(200).json({
      totalGovtJobs,
      totalPrivateJobs,
      totalRequestForm,
      totalUsers,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard data', error: error.message });
  }
};

module.exports = { getDashboardData };

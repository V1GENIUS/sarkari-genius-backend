const express = require('express');
const { addJob, getJobs,updateJob, deleteJob } = require('../controllers/JobLinkController');

const router = express.Router();

// POST route to create job link
router.post('/create-job-link', addJob);

// GET: Fetch all jobs
router.get('/jobs', getJobs);

router.put('/jobs/:id', updateJob); // Update job by ID
router.delete('/jobs/:id', deleteJob); // Delete job by ID

module.exports = router;

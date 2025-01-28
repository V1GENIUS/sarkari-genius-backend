const Job = require('../models/Job');
const redisClient = require('../Database/redisClient'); // Assuming Redis client setup

// Utility function to validate job input
const validateJobInput = (data) => {
  const requiredFields = [
    'postName',
    'organization',
    'vacancy',
    'salary',
    'importantDates',
    'fees',
    'ageLimit',
    'selectionProcess',
    'Qualification',
    'jobLocation',
    'documentDetails',
    'officialPdfLink',
    'websiteLink',
  ];

  const missingFields = requiredFields.filter((field) => !data[field]);
  if (missingFields.length) {
    return { valid: false, message: `Missing required fields: ${missingFields.join(', ')}` };
  }
  return { valid: true };
};

// Create a new job
const createJob = async (req, res) => {
  try {
    const validation = validateJobInput(req.body);
    if (!validation.valid) {
      return res.status(400).json({ message: validation.message });
    }

    const job = new Job(req.body);
    const savedJob = await job.save();

    // Invalidate cache for all jobs
    await redisClient.del('allJobs');

    res.status(201).json(savedJob);
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ message: 'Error creating job', error: error.message });
  }
};

// Get all jobs
const getAllJobs = async (req, res) => {
  try {
    const cacheKey = 'allJobs';

    // Check cache
    const cachedJobs = await redisClient.get(cacheKey);
    if (cachedJobs) {
      console.log('Serving from cache');
      return res.status(200).json(JSON.parse(cachedJobs));
    }

    // Fetch from database if not cached
    const jobs = await Job.find();

    // Store result in cache
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(jobs));

    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ message: 'Error fetching jobs', error: error.message });
  }
};

// Get a job by ID
const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const cacheKey = `job:${jobId}`;

    // Check cache
    const cachedJob = await redisClient.get(cacheKey);
    if (cachedJob) {
      return res.status(200).json(JSON.parse(cachedJob));
    }

    // Fetch from database if not cached
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Cache the result
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(job));

    res.status(200).json(job);
  } catch (error) {
    console.error('Error fetching job:', error);
    res.status(500).json({ message: 'Error fetching job', error: error.message });
  }
};

// Update a job
const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    const validation = validateJobInput(req.body);
    if (!validation.valid) {
      return res.status(400).json({ message: validation.message });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Invalidate cache for this job and all jobs
    await redisClient.del(`job:${jobId}`);
    await redisClient.del('allJobs');

    res.status(200).json({ message: 'Job updated successfully', job: updatedJob });
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({ message: 'Error updating job', error: error.message });
  }
};

// Delete a job
const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    const deletedJob = await Job.findByIdAndDelete(jobId);

    if (!deletedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Invalidate cache for this job and all jobs
    await redisClient.del(`job:${jobId}`);
    await redisClient.del('allJobs');

    res.status(200).json({ message: 'Job deleted successfully', job: deletedJob });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ message: 'Error deleting job', error: error.message });
  }
};

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
};

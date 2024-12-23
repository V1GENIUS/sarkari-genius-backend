const Job = require('../models/Job');

// Add a Job
const addJob = async (req, res) => {
  const { jobName, jobLink } = req.body;

  if (!jobName || !jobLink) {
    return res.status(400).json({ message: 'Job name and link are required' });
  }

  try {
    const newJob = new Job({ jobName, jobLink });
    await newJob.save();
    res.status(201).json({ message: 'Job added successfully', job: newJob });
  } catch (error) {
    console.error('Error adding job:', error);
    res.status(500).json({ message: 'Error adding job', error: error.message });
  }
};

// get all jobs details
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs', error: error.message });
  }
};

// Update a job
const updateJob = async (req, res) => {
  const { id } = req.params;
  const { jobName, jobLink } = req.body;

  try {
    const updatedJob = await Job.findByIdAndUpdate(
      id,
      { jobName, jobLink },
      { new: true }
    );
    res.status(200).json({ message: 'Job updated successfully', updatedJob });
  } catch (error) {
    res.status(500).json({ message: 'Error updating job', error });
  }
};

// Delete a job
const deleteJob = async (req, res) => {
  const { id } = req.params;

  try {
    await Job.findByIdAndDelete(id);
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting job', error });
  }
};


module.exports = { addJob  , getJobs, updateJob, deleteJob};

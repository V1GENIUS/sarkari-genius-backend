const Job = require('../models/Job');
const GovtRequestForm = require('../models/GovtRequestForm');
// const client = require('../config/redis');

// Create a new job
const createJob = async (req, res) => {
  try {
    const { postName, organization,vacancy, salary,importantDates,fees, ageLimit, selectionProcess,Qualification,jobLocation ,documentDetails,officialPdfLink,websiteLink} = req.body;

    const job = new Job({
      postName,
      organization,
      vacancy,
      salary,
      importantDates,
      fees,
      ageLimit,
      selectionProcess,
      Qualification,
      jobLocation,
      documentDetails,
      officialPdfLink,
      websiteLink
    });

    const savedJob = await job.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(500).json({ message: 'Error creating job', error: error.message });
  }
};

// Get a job by ID
const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;

    // Find the job by ID
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching job', error: error.message });
  }
};



// Get all jobs
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs', error: error.message });
  }
};

const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const updatedData = req.body;

    // Find the job by ID and update it with the new data
    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      { $set: updatedData }, 
      { new: true, runValidators: true } 
    );

    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json({ message: 'Job updated successfully', job: updatedJob });
  } catch (error) {
    res.status(500).json({ message: 'Error updating job', error: error.message });
  }
};


const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    const deletedJob = await Job.findByIdAndDelete(jobId);

    if (!deletedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json({ message: 'Job deleted successfully', job: deletedJob });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting job', error: error.message });
  }
};

const submitGovtRequestForm = async (req, res) => {
  const { name, email, mobile, whatsapp, address, jobDetails, agree } = req.body;

  if (!name || !email || !mobile || !whatsapp || !address || !jobDetails) {
    return res.status(400).json({ message: 'Please fill all required fields.' });
  }

  try {
    const newRequest = new GovtRequestForm({
      name,
      email,
      mobile,
      whatsapp,
      address,
      jobDetails,
      agree: agree || false
    });

    const savedRequest = await newRequest.save();
    res.status(201).json({ message: 'Form submitted successfully.', data: savedRequest });
  } catch (error) {
    console.error('Govt request form submission error:', error.message);
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
};


const getAllGovtRequest = async (req, res) => {
  try {
    const requests = await GovtRequestForm.find();
    res.status(200).json({
      message: 'All data is here',
      requests,
    });
  } catch (err) {
    console.error("Error fetching Govt Requests:", err.message);
    res.status(500).json({
      message: 'Error fetching requests',
      error: err.message,
    });
  }
};



module.exports = { createJob, getAllJobs, deleteJob ,updateJob ,getJobById ,submitGovtRequestForm ,getAllGovtRequest};

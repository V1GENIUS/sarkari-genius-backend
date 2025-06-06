const Job = require('../models/Job');
const GovtRequestForm = require('../models/GovtRequestForm');
// const client = require('../config/redis');

// Create a new job
const createJob = async (req, res) => {
  try {
    const { postName, organization,vacancy, salary,importantDates,fees, ageLimit, selectionProcess,Qualification,jobLocation ,documentDetails,officialPdfLink,websiteLink,admitcard} = req.body;

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
      websiteLink,
      admitcard : "Soon"
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
    const total = await Job.countDocuments();
    
    // res.status(200).json(jobs);
    res.status(200).json({
      message: 'All data is here',
      total,
      jobs
    });
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


// user Resquests API
const submitGovtRequestForm = async (req, res) => {
  const { name, email, mobile, whatsapp, address, jobDetails, agree  } = req.body;

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
      agree: agree || false,
      status: 'Request Received'
    });

    const savedRequest = await newRequest.save();
    res.status(201).json({ message: 'Form submitted successfully.', data: savedRequest });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong. Please try again.' , error });
  }
};
const getAllGovtRequest = async (req, res) => {
  try {
    const requests = await GovtRequestForm.find();
    const total = await GovtRequestForm.countDocuments();
    res.status(200).json({
      message: 'All data is here',
      total,
      requests,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error fetching requests',
      error: err.message,
    });
  }
};


const deleteGovtRequest = async (req, res) => {
  try {
    const requestId = req.params.id;
    const deletedRequest = await GovtRequestForm.findByIdAndDelete(requestId);

    if (!deletedRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.status(200).json({ message: 'Request deleted successfully', data: deletedRequest });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting request', error: error.message });
  }
};
const updateGovtRequestStatus = async (req, res) => {
  try {
    const requestId = req.params.id;
    const { status } = req.body;

    const validStatuses = ['Request Received', 'Viewed', 'Waiting for Platform', 'Completed', 'Cancelled'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const updatedRequest = await GovtRequestForm.findByIdAndUpdate(
      requestId,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.status(200).json({ message: 'Status updated successfully', data: updatedRequest });
  } catch (error) {
    res.status(500).json({ message: 'Error updating status', error: error.message });
  }
};


module.exports = { createJob, getAllJobs, deleteJob ,updateJob ,getJobById ,submitGovtRequestForm ,getAllGovtRequest ,deleteGovtRequest ,updateGovtRequestStatus};

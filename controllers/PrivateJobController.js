
const PrivateJobs = require('../models/PrivateJobs');
// const client = require('../config/redis');

// Create a new job
const createPrivateJob = async (req, res) => {
  try {
    const { JobDegination, organization, salary,experience,batch,Qualification,location,applyLink} = req.body;

    const job = new PrivateJobs({
      JobDegination,
      organization,
      salary,
      experience,
      batch,
      Qualification,
      location,
      applyLink,
      
    });

    const savedJob = await job.save();
    res.status(201).json({ massage: "succefully added data" ,savedJob});
  } catch (error) {
    res.status(500).json({ message: 'Error creating job', error: error.message });
  }
};

// Get a job by ID
const getPrivateJobById = async (req, res) => {
  try {
    const jobId = req.params.id;

    // Find the job by ID
    const job = await PrivateJobs.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json({massage : "successfully get data by id" , job});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching job', error: error.message });
  }
};



// Get all jobs
// const getAllPrivateJobs = async (req, res) => {
//   try {
//     const jobs = await PrivateJobs.find();
//     res.status(200).json({massage:"Successfully all data are getted", jobs});
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching jobs', error: error.message });
//   }
// };


const getAllPrivateJobs = async (req, res) => {
  try {
    const jobs = await PrivateJobs.find();

    if (!Array.isArray(jobs)) {
      return res.status(500).json({ message: 'Invalid data format received' });
    }

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Errors fetching jobs', error: error.message });
  }
};

const updatePrivateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const updatedData = req.body;

    // Find the job by ID and update it with the new data
    const updatedJob = await PrivateJobs.findByIdAndUpdate(
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



const deletePrivateJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    const deletedJob = await PrivateJobs.findByIdAndDelete(jobId);

    if (!deletedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json({ message: 'Job deleted successfully', job: deletedJob });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting job', error: error.message });
  }
};

module.exports = { createPrivateJob, getAllPrivateJobs, deletePrivateJob ,updatePrivateJob ,getPrivateJobById};

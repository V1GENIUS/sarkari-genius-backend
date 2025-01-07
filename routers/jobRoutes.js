const express = require('express');
const { createJob, getAllJobs, deleteJob,updateJob ,getJobById} = require('../controllers/jobController');
const router = express.Router();

router.post('/create', createJob);
router.get('/', getAllJobs);
router.delete('/:id', deleteJob);
router.put('/jobs/:id', updateJob);
router.get('/:id', getJobById);


module.exports = router;

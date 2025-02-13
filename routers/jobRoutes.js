const express = require('express');
const { createJob, getAllJobs, deleteJob,updateJob ,getJobById} = require('../controllers/jobController');
const router = express.Router();
// const cacheMiddleware = require('../MIDDLEWARE/cacheMiddleware');


router.post('/create', createJob);
router.get('/', getAllJobs);
router.delete('/:id', deleteJob);
router.put('/jobs/:id', updateJob);
router.get('/:id', getJobById);


// router.get('/:id', cacheMiddleware, getJobById);

module.exports = router;

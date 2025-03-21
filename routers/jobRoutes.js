const express = require('express');
const { createJob, getAllJobs, deleteJob,updateJob ,getJobById} = require('../controllers/jobController');
const { createPrivateJob, getAllPrivateJobs, deletePrivateJob,updatePrivateJob ,getPrivateJobById} = require('../controllers/PrivateJobController');

const router = express.Router();
// const cacheMiddleware = require('../MIDDLEWARE/cacheMiddleware');

//govt jobs routes
router.post('/create', createJob);
router.get('/', getAllJobs);
router.delete('/:id', deleteJob);
router.put('/jobs/:id', updateJob);
router.get('/:id', getJobById);


// private jobs routes
// pri = private 
router.post('/pri/create', createPrivateJob);
router.get('/pri', getAllPrivateJobs);
router.delete('/pri/:id', deletePrivateJob);
router.put('/prijobs/:id', updatePrivateJob);
router.get('/pri/:id', getPrivateJobById);

// router.get('/:id', cacheMiddleware, getJobById);

module.exports = router;

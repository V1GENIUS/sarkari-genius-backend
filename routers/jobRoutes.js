const express = require('express');
const { createJob, getAllJobs, deleteJob,updateJob ,getJobById, submitGovtRequestForm ,getAllGovtRequest} = require('../controllers/jobController');
const { createPrivateJob, getAllPrivateJobs, deletePrivateJob,updatePrivateJob ,getPrivateJobById} = require('../controllers/PrivateJobController');
// const authMiddleware = require('../MIDDLEWARE/userMiddleware');
const router = express.Router();
// const cacheMiddleware = require('../MIDDLEWARE/cacheMiddleware');



// private jobs routes
// pri = private 
router.post('/pri/create', createPrivateJob);
router.get('/pri', getAllPrivateJobs);
router.delete('/pri/:id', deletePrivateJob);
router.put('/pri/:id', updatePrivateJob);
router.get('/pri/:id', getPrivateJobById);


//govt jobs routes
router.post('/create', createJob);
router.post('/govt-request', submitGovtRequestForm);
router.delete('/:id', deleteJob);
router.put('/jobs/:id', updateJob);

router.get('/request', getAllGovtRequest);
router.get('/:id',  getJobById);
router.get('/', getAllJobs);






// router.get('/:id', cacheMiddleware, getJobById);

module.exports = router;

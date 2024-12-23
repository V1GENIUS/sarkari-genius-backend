const express = require("express");
const {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

const router = express.Router();

router.route("/").get(getJobs).post(createJob);
router
  .route("/:id")
  .get(getJobById)
  .put(updateJob)
  .delete(deleteJob);

module.exports = router;

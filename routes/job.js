//#region Dependency list
const { validCreateJob, createJob } = require("../api/job/createJob");
const { getAllJobs } = require("../api/job/getAll");

const router = require("express").Router();
//#endregion

router.get("/get-all", getAllJobs);
router.put("/create", validCreateJob, createJob);
router.put("/edit", validCreateJob, createJob);
//router.delete("/delete/:jobId", isAuth, deleteJob);

module.exports = router;

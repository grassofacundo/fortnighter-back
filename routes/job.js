//#region Dependency list
const { validCreateJob, createJob } = require("../api/job/createJob");
const { getAllJobs } = require("../api/job/getAll");
const { isAuth } = require("../middlewares/is-auth");

const router = require("express").Router();
//#endregion

router.get("/get-all", isAuth, getAllJobs);
router.put("/create", isAuth, validCreateJob, createJob);
//router.delete("/delete/:jobId", isAuth, deleteJob);

module.exports = router;

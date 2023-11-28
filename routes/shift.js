//#region Dependency list
const { createShift, validCreateShift } = require("../api/shift/createShift");

const router = require("express").Router();
//#endregion

//router.get("/get-all", getAllJobs);
router.put("/create", validCreateShift, createShift);
//router.put("/edit", validCreateJob, createJob);
//router.delete("/delete/:jobId", isAuth, deleteJob);

module.exports = router;

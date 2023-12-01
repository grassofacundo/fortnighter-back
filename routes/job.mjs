//#region Dependency list
import { Router } from "express";
import { createJob, validCreateJob } from "../api/job/createJob.mjs";
import { getAllJobs } from "../api/job/getAll.mjs";
//#endregion

export const router = Router();
router.get("/get-all", getAllJobs);
router.put("/create", validCreateJob, createJob);
router.put("/edit", validCreateJob, createJob);
//router.delete("/delete/:jobId", isAuth, deleteJob);

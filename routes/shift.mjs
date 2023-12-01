//#region Dependency list
import { Router } from "express";
import { createShift, validCreateShift } from "../api/shift/createShift.mjs";
//#endregion

export const router = Router();
//router.get("/get-all", getAllJobs);
router.put("/create", validCreateShift, createShift);
//router.put("/edit", validCreateJob, createJob);
//router.delete("/delete/:jobId", isAuth, deleteJob);

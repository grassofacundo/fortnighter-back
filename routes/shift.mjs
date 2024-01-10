//#region Dependency list
import { Router } from "express";
import { createShift, validCreateShift } from "../api/shift/createShift.mjs";
import { getShifts } from "../api/shift/getShifts.mjs";
import { updateShift, validUpdateShift } from "../api/shift/updateShift.mjs";
//#endregion

export const router = Router();
router.get("/get-shifts", getShifts);
router.put("/create", validCreateShift, createShift);
router.put("/update", validUpdateShift, updateShift);
//router.put("/edit", validCreateJob, createJob);
//router.delete("/delete/:jobId", isAuth, deleteJob);

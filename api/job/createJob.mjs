//#region Dependency list
import { body, validationResult } from "express-validator";
import { setError } from "../../utils/error-setter.mjs";
import { jobModel } from "../../models/job.mjs";
import { userModel } from "../../models/user.mjs";
import { getId } from "../../utils/tools.mjs";
//#endregion

export async function createJob(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) setError("Validation failed", 422, errors.array());

    const {
        name,
        hourPrice,
        workdayTimes,
        lastPayment,
        nextPayment,
        companyName,
    } = req.body;

    try {
        const user = await userModel.findById(req.user.userId);
        const newJob = new jobModel({
            name,
            hourPrice,
            workdayTimes,
            lastPayment,
            nextPayment,
            companyName,
            user,
        });
        const savedJob = await newJob.save();
        user.jobs.push(savedJob._id);
        await user.save();
        res.status(201).json(getId(savedJob));
    } catch (error) {
        next(error);
    }
}

export const validCreateJob = [body("name").trim().not().isEmpty()];

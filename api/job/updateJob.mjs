//#region Dependency list
import { body, validationResult } from "express-validator";
import { setError } from "../../utils/error-setter.mjs";
import { jobModel } from "../../models/job.mjs";
import { getId } from "../../utils/tools.mjs";
//#endregion

export async function updateJob(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) setError("Validation failed", 422, errors.array());

    const {
        id,
        name,
        hourPrice,
        cycleEnd,
        isFortnightly,
        companyName,
        description,
        address,
    } = req.body;

    try {
        const storedJob = await jobModel.findById(id);
        (storedJob.name = name),
            (storedJob.hourPrice = hourPrice),
            (storedJob.cycleEnd = new Date(cycleEnd)),
            (storedJob.isFortnightly = isFortnightly),
            (storedJob.companyName = companyName),
            (storedJob.description = description),
            (storedJob.address = address),
            await storedJob.save();

        res.status(201).json({
            id: getId(storedJob),
            name,
            hourPrice,
            cycleEnd,
            isFortnightly,
            companyName,
            description,
            address,
        });
    } catch (error) {
        next(error);
    }
}

export const validUpdateJob = [body("name").trim().not().isEmpty()];

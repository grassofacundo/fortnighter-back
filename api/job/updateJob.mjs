//#region Dependency list
import { body, validationResult } from "express-validator";
import { setError } from "../../utils/error-setter.mjs";
import { jobModel } from "../../models/job.mjs";
//#endregion

export async function updateJob(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) setError("Validation failed", 422, errors.array());

    const {
        id,
        name,
        hourPrice,
        workdayTimes,
        nextPayment,
        lastPayment,
        companyName,
    } = req.body;

    try {
        const j = await jobModel.findById(id);
        if (j.name !== name) j.name = name;
        if (j.hourPrice !== hourPrice) j.hourPrice = hourPrice;
        if (j.workdayTimes !== workdayTimes) j.workdayTimes = workdayTimes;
        if (j.lastPayment !== lastPayment) j.lastPayment = lastPayment;
        if (j.nextPayment !== nextPayment) j.nextPayment = nextPayment;
        if (j.companyName !== companyName) j.companyName = companyName;
        await j.save();

        res.status(201).json({});
    } catch (error) {
        next(error);
    }
}

export const validUpdateJob = [body("name").trim().not().isEmpty()];

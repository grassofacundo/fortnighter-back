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
        workdayTimes,
        nextPaymentDate,
        paymentLapse,
        companyName,
    } = req.body;

    try {
        const j = await jobModel.findById(id);
        if (j.name !== name) j.name = name;
        if (j.hourPrice !== hourPrice) j.hourPrice = hourPrice;
        if (j.workdayTimes !== workdayTimes) j.workdayTimes = workdayTimes;
        if (j.paymentLapse !== paymentLapse) j.paymentLapse = paymentLapse;
        const payment = new Date(nextPaymentDate);
        if (j.nextPaymentDate !== payment) j.nextPaymentDate = payment;
        if (j.companyName !== companyName) j.companyName = companyName;
        await j.save();

        res.status(201).json({ updateJob: j });
    } catch (error) {
        next(error);
    }
}

export const validUpdateJob = [body("name").trim().not().isEmpty()];

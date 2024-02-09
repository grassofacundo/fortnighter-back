//#region Dependency list
import { body, validationResult } from "express-validator";
import { setError } from "../../utils/error-setter.mjs";
import { jobModel } from "../../models/job.mjs";
import { paymentModel } from "../../models/payment.mjs";
//#endregion

export async function createPayment(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) setError("Validation failed", 422, errors.array());

    const { startDate, endDate, hourPrice, modifiers, shifts, jobId } =
        req.body;

    try {
        const job = await jobModel.findById(jobId);
        if (!job) setError("Error getting job from database");

        const newPayment = new paymentModel({
            startDate,
            endDate,
            hourPrice,
            modifiers,
            shifts,
            job,
        });
        const payment = await newPayment.save();

        const newDated = await job.updateAfterPayment();

        res.status(201).json({
            paymentId: getId(payment),
            newLastPayment: newDated.newLastPayment,
            newNextPayment: newDated.newNextPayment,
        });
    } catch (error) {
        next(error);
    }
}

export const validCreatePayment = [body("startDate").not().isEmpty()];

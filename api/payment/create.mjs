//#region Dependency list
import { body, validationResult } from "express-validator";
import { setError } from "../../utils/error-setter.mjs";
import { jobModel } from "../../models/job.mjs";
import { userModel } from "../../models/user.mjs";
import { getId } from "../../utils/tools.mjs";
import { paymentModel } from "../../models/payment.mjs";
//#endregion

export async function createPayment(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) setError("Validation failed", 422, errors.array());

    const { amount, startDate, endDate, jobId } = req.body;

    try {
        const user = await userModel.findById(req.userId);
        const job = await jobModel.findById(jobId);

        const newPayment = new paymentModel({
            amount,
            startDate,
            endDate,
            user,
            job,
        });
        const savedPayment = await newPayment.save();

        res.status(201).json({
            id: getId(savedPayment),
            amount,
            startDate,
            endDate,
        });
    } catch (error) {
        next(error);
    }
}

export const validCreatePayment = [body("startDate").not().isEmpty()];

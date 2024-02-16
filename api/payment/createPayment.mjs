//#region Dependency list
import { body, validationResult } from "express-validator";
import { setError } from "../../utils/error-setter.mjs";
import { getId } from "../../utils/tools.mjs";
import { jobModel } from "../../models/job.mjs";
import { paymentModel } from "../../models/payment.mjs";
import { userModel } from "../../models/user.mjs";
import { modifierModel } from "../../models/modifier.mjs";
import { shiftModel } from "../../models/shift.mjs";
//#endregion

export async function createPayment(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) setError("Validation failed", 422, errors.array());

    const { startDate, endDate, hourPrice, modifiers, shifts, jobId } =
        req.body;

    try {
        const job = await jobModel.findById(jobId);
        if (!job) setError("Error getting job from database");

        const user = await userModel.findById(req.user.userId);
        const modifiersArr = modifiers.map(
            (m) => new modifierModel({ ...m, user, job })
        );

        const shiftsArr = shifts.map(
            (s) =>
                new shiftModel({
                    user,
                    job,
                    startTime: s.start,
                    endTime: s.end,
                    isHoliday: s.isHoliday,
                    forcedTotal: s.forcedTotal,
                })
        );

        const newPayment = new paymentModel({
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            hourPrice,
            modifiers: modifiersArr,
            shifts: shiftsArr,
            job,
        });
        const payment = await newPayment.save();

        const newDates = await job.updateAfterPayment();

        res.status(201).json({
            paymentId: getId(payment),
            newLastPayment: newDates.newLastPayment,
            newNextPayment: newDates.newNextPayment,
        });
    } catch (error) {
        next(error);
    }
}

export const validCreatePayment = [body("startDate").not().isEmpty()];

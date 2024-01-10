//#region Dependency list
import { body, validationResult } from "express-validator";
import { setError } from "../../utils/error-setter.mjs";
import { userModel } from "../../models/user.mjs";
import { getId } from "../../utils/tools.mjs";
import { shiftModel } from "../../models/shift.mjs";
//#endregion

export async function createShift(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) setError("Validation failed", 422, errors.array());

    const { jobId, isHoliday, startTime, endTime } = req.body;

    try {
        const user = await userModel.findById(req.userId);
        const newShift = new shiftModel({
            user,
            job: jobId,
            startTime,
            endTime,
            isHoliday,
        });
        const savedShift = await newShift.save();
        res.status(201).json(getId(savedShift));
    } catch (error) {
        next(error);
    }
}

export const validCreateShift = [body("startTime").trim().not().isEmpty()];

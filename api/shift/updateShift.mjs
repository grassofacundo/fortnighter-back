//#region Dependency list
import { body, validationResult } from "express-validator";
import { setError } from "../../utils/error-setter.mjs";
import { userModel } from "../../models/user.mjs";
import { getId } from "../../utils/tools.mjs";
import { shiftModel } from "../../models/shift.mjs";
//#endregion

export async function updateShift(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) setError("Validation failed", 422, errors.array());

    const { id, isHoliday, startTime, endTime } = req.body;

    try {
        const shift = await shiftModel.findById(id);
        if (isHoliday !== shift.isHoliday) shift.isHoliday = isHoliday;
        if (startTime !== shift.startTime) shift.startTime = startTime;
        if (endTime !== shift.endTime) shift.endTime = endTime;
        await shift.save();

        res.status(201).send();
    } catch (error) {
        next(error);
    }
}

export const validUpdateShift = [];

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

    const { id, isHoliday, start, end, forcedTotal } = req.body;

    try {
        const shift = await shiftModel.findById(id);
        if (isHoliday !== shift.isHoliday) shift.isHoliday = isHoliday;
        if (start !== shift.startTime) shift.startTime = start;
        if (end !== shift.endTime) shift.endTime = end;
        if (forcedTotal !== shift.forcedTotal) shift.forcedTotal = forcedTotal;
        await shift.save();

        res.status(201).send({});
    } catch (error) {
        next(error);
    }
}

export const validUpdateShift = [];

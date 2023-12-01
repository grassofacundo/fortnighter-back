//#region Dependency list
import { shiftModel } from "../../models/shift.mjs";
import { setError } from "../../utils/error-setter.mjs";
import { getId } from "../../utils/tools.mjs";
//#endregion

export async function getShifts(req, res, next) {
    try {
        const { startDate, endDate, jobPositionId } = req.query;
        if (!startDate || !endDate || !jobPositionId)
            setError("Validation failed", 422, errors.array());

        const shifts = await shiftModel.find({
            user: req.userId,
            job: jobPositionId,
            startTime: { $gte: startDate, $lte: endDate },
        });

        const shiftList = shifts.map((shift) => {
            return {
                jobPositionId: getId(shift.job),
                isHoliday: shift.isHoliday,
                startTime: shift.startTime,
                endTime: shift.endTime,
            };
        });

        res.status(201).json(shiftList);
    } catch (error) {
        next(error);
    }
}

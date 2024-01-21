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

        const start = new Date(`${startDate}T23:59:59`);
        const end = new Date(`${endDate}T23:59:59`);
        const shifts = await shiftModel.find({
            user: req.user.userId,
            job: jobPositionId,
            startTime: { $gte: start, $lte: end },
        });

        const shiftList = shifts.map((shift) => {
            return {
                id: getId(shift),
                jobPositionId: getId(shift.job),
                isHoliday: shift.isHoliday,
                startTime: shift.startTime,
                endTime: shift.endTime,
                forcedTotal: shift.forcedTotal,
            };
        });

        res.status(201).json(shiftList);
    } catch (error) {
        next(error);
    }
}

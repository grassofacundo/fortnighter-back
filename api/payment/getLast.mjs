//#region Dependency list
import { paymentModel } from "../../models/payment.mjs";
import { setError } from "../../utils/error-setter.mjs";
//import { getId } from "../../utils/tools.mjs";
//#endregion

export async function getLastPayment(req, res, next) {
    try {
        const user = await userModel.findById(req.userId);
        if (!user) setError("User not authorized", 401);
        const { jobId, startDate, endDate } = req.query;
        if (!jobId || !startDate || !endDate)
            setError("Missing required param", 422, errors.array());

        const payment = await paymentModel.findOne({
            user: req.userId,
            job: jobPositionId,
            startTime: { $gte: startDate, $lte: endDate },
            endDate: { $gte: startDate, $lte: endDate },
        });

        // const shiftList = shifts.map((shift) => {
        //     return {
        //         jobPositionId: getId(shift.job),
        //         isHoliday: shift.isHoliday,
        //         startTime: shift.startTime,
        //         endTime: shift.endTime,
        //     };
        // });

        res.status(201).json(payment);
    } catch (error) {
        next(error);
    }
}

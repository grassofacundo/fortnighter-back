//#region Dependency list
import { paymentModel } from "../../models/payment.mjs";
import { setError } from "../../utils/error-setter.mjs";
//import { getId } from "../../utils/tools.mjs";
//#endregion

export async function getAllPayments(req, res, next) {
    try {
        const user = await userModel.findById(req.userId);
        if (!user) setError("User not authorized", 401);
        const { jobId } = req.query;
        if (!jobId) setError("Missing required param", 422, errors.array());

        const payments = await paymentModel.find({
            user: req.userId,
            job: jobPositionId,
        });

        // const shiftList = shifts.map((shift) => {
        //     return {
        //         jobPositionId: getId(shift.job),
        //         isHoliday: shift.isHoliday,
        //         startTime: shift.startTime,
        //         endTime: shift.endTime,
        //     };
        // });

        res.status(201).json(payments);
    } catch (error) {
        next(error);
    }
}

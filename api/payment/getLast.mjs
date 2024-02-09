//#region Dependency list
import { jobModel } from "../../models/job.mjs";
import { paymentModel } from "../../models/payment.mjs";
import { setError } from "../../utils/error-setter.mjs";
import { getId } from "../../utils/tools.mjs";
//import { getId } from "../../utils/tools.mjs";
//#endregion

export async function getLastPayment(req, res, next) {
    try {
        const { jobId, startDate, endDate } = req.query;
        if (!jobId || !startDate || !endDate)
            setError("Missing required param", 422);

        const job = await jobModel
            .findById(jobId)
            .populate({ path: "currentPayment" });
        const payments = await paymentModel.findById(jobId);

        const sortedPayments = payments.filter(
            (p) =>
                getId(p) !== getId(job.currentPayment) && p.endDate < startDate
        );

        res.status(201).json(sortedPayments[0]);
    } catch (error) {
        next(error);
    }
}

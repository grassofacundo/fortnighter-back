//#region Dependency list
import { jobModel } from "../../models/job.mjs";
import { paymentModel } from "../../models/payment.mjs";
import { setError } from "../../utils/error-setter.mjs";
//#endregion

export async function getLastPayment(req, res, next) {
    try {
        const { jobId } = req.query;
        if (!jobId) setError("Missing required param", 422);

        const job = await jobModel.findById(jobId);
        const payments = await paymentModel.find({ job });

        let sortedPayments = [];
        if (payments)
            sortedPayments = payments.sort((x, y) => x.endDate - y.endDate);

        res.status(201).json(sortedPayments ? sortedPayments[0] : undefined);
    } catch (error) {
        next(error);
    }
}

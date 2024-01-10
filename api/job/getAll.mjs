//#region Dependency list
import { userModel } from "../../models/user.mjs";
import { setError } from "../../utils/error-setter.mjs";
import { getId } from "../../utils/tools.mjs";
//#endregion

export async function getAllJobs(req, res, next) {
    try {
        const user = await userModel.findById(req.userId);
        if (!user) setError("User not authorized", 401);
        const userWithJob = await user.populate({ path: "jobs" });
        const jobList = [];
        if (userWithJob?.jobs.length > 0) {
            userWithJob.jobs.forEach((job) => {
                jobList.push({
                    id: getId(job),
                    name: job.name,
                    hourPrice: job.hourPrice,
                    workdayTimes: job.workdayTimes,
                    paymentLapse: job.paymentLapse,
                    nextPaymentDate: job.nextPaymentDate,
                    companyName: job.companyName,
                });
            });
        }

        res.status(201).json(jobList);
    } catch (error) {
        next(error);
    }
}

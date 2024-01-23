//#region Dependency list
import { userModel } from "../../models/user.mjs";
import { setError } from "../../utils/error-setter.mjs";
import { removeEmptyProperties } from "../../utils/objectCleaner.mjs";
import { getId } from "../../utils/tools.mjs";
//#endregion

export async function getAllJobs(req, res, next) {
    try {
        const user = await userModel.findById(req.user.userId);
        if (!user) setError("User not authorized", 401);
        const userWithJob = await user.populate({ path: "jobs" });
        const jobList = [];
        if (userWithJob?.jobs.length > 0) {
            userWithJob.jobs.forEach((job) => {
                const cleanedHourPrice = removeEmptyProperties(job.hourPrice);
                const cleanedWorkdayTimes = removeEmptyProperties(
                    job.workdayTimes
                );
                jobList.push({
                    id: getId(job),
                    name: job.name,
                    hourPrice: cleanedHourPrice,
                    workdayTimes: cleanedWorkdayTimes,
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

//#region Dependency list
import { userModel } from "../../models/user.mjs";
import { modifierModel } from "../../models/modifier.mjs";
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
            for (const job of userWithJob.jobs) {
                const cleanedHourPrice = removeEmptyProperties(job.hourPrice);
                const cleanedWorkdayTimes = removeEmptyProperties(
                    job.workdayTimes
                );
                const modifiers = await modifierModel.find({ user, job });
                if (modifiers.length > 0) job.modifiers = [];
                modifiers.forEach((m) => job.modifiers.push(m));

                jobList.push({
                    id: getId(job),
                    name: job.name,
                    hourPrice: cleanedHourPrice,
                    workdayTimes: cleanedWorkdayTimes,
                    paymentLapse: job.paymentLapse,
                    nextPaymentDate: job.nextPaymentDate,
                    companyName: job.companyName,
                    modifiers: job.modifiers,
                });
            }
        }

        res.status(201).json(jobList);
    } catch (error) {
        next(error);
    }
}

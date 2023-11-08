//#region Dependency list
const userModel = require("../../models/user");
const jobModel = require("../../models/job");
const { setError } = require("../../utils/error-setter");
//#endregion

exports.getAllJobs = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.userId);
        if (!user) setError("User not authorized", 401);
        const userWithJob = await user.populate({ path: "jobs" });
        const jobList = [];
        if (userWithJob?.jobs.length > 0) {
            userWithJob.jobs.forEach((job) => {
                jobList.push({
                    id: job._id.toString(),
                    name: job.positionName,
                    isSelected: false,
                });
            });
        }

        res.status(201).json(jobList);
    } catch (error) {
        next(error);
    }
};

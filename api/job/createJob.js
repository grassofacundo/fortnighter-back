//#region Dependency list
const { body, validationResult } = require("express-validator");
const { setError } = require("../../utils/error-setter");
const jobModel = require("../../models/job");
const userModel = require("../../models/user");
//#endregion

exports.createJob = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) setError("Validation failed", 422, errors.array());

    const { positionName } = req.body;

    try {
        const user = await userModel.findById(req.userId);
        const newJob = new jobModel({
            positionName,
            user,
        });
        const savedJob = await newJob.save();
        user.jobs.push(savedJob._id);
        await user.save();
        res.status(201).json({
            message: "Job position created successfully",
            position: savedJob,
        });
    } catch (error) {
        next(error);
    }
};

exports.validCreateJob = [body("positionName").trim().not().isEmpty()];

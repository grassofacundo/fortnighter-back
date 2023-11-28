//#region Dependency list
const { body, validationResult } = require("express-validator");
const { setError } = require("../../utils/error-setter");
const userModel = require("../../models/user");
const { getId } = require("../../utils/tools");
const shiftModel = require("../../models/shift");
//#endregion

exports.createShift = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) setError("Validation failed", 422, errors.array());

    const { jobPositionId, isHoliday, startTime, endTime } = req.body;

    try {
        const user = await userModel.findById(req.userId);
        const newShift = new shiftModel({
            user,
            job: jobPositionId,
            startTime,
            endTime,
            isHoliday,
        });
        const savedShift = await newShift.save();
        res.status(201).json({
            id: getId(savedShift),
            ...newShift,
        });
    } catch (error) {
        next(error);
    }
};

exports.validCreateShift = [body("startTime").trim().not().isEmpty()];

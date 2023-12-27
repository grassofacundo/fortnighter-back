//#region Dependency list
import { validationResult } from "express-validator";
import { setError } from "../../utils/error-setter.mjs";
import { jobModel } from "../../models/job.mjs";
import { userModel } from "../../models/user.mjs";
import { getId } from "../../utils/tools.mjs";
import { modifierModel } from "../../models/modifier.mjs";
//#endregion

export async function createModifier(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) setError("Validation failed", 422, errors.array());

    const {
        name,
        periodicTimeCondition,
        specificTimeCondition,
        amountCondition,
        amount,
        jobId,
    } = req.body;

    try {
        const user = await userModel.findById(req.userId);
        const job = await jobModel.findById(jobId);

        const newModifier = new modifierModel({
            name,
            periodicTimeCondition,
            specificTimeCondition,
            amountCondition,
            amount,
            user,
            job,
        });
        const savedModifier = await newModifier.save();

        res.status(201).json({
            id: getId(savedModifier),
            name: savedModifier.name,
            periodicTimeCondition: savedModifier.periodicTimeCondition,
            specificTimeCondition: savedModifier.specificTimeCondition,
            amountCondition: savedModifier.amountCondition,
            amount: savedModifier.amount,
        });
    } catch (error) {
        next(error);
    }
}

//export const validCreateModifier = [body("name").trim().not().isEmpty()];

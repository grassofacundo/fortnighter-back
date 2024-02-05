//#region Dependency list
import { modifierModel } from "../../models/modifier.mjs";
//#endregion

export async function deleteModifier(req, res, next) {
    const { modifierId } = req.body;

    try {
        if (modifierId) await modifierModel.deleteOne({ _id: modifierId });

        res.json({});
    } catch (error) {
        next(error);
    }
}

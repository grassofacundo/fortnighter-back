//#region Dependency list
import { sessionModel } from "../../models/session.mjs";
//#endregion

export async function logout(req, res, next) {
    res.cookie("accessToken", "", {
        maxAge: 0,
        SameSite: "None",
        secure: true,
    });

    res.cookie("refreshToken", "", {
        maxAge: 0,
        SameSite: "None",
        secure: true,
    });

    const { sessionId } = req.body;

    if (sessionId) await sessionModel.deleteOne({ _id: sessionId });

    res.json({});
}

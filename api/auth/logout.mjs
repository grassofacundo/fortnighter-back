//#region Dependency list
import { sessionModel } from "../../models/session.mjs";
//#endregion

export async function logout(req, res, next) {
    res.cookie("accessToken", "", {
        maxAge: 0,
        httpOnly: true,
    });

    res.cookie("refreshToken", "", {
        maxAge: 0,
        httpOnly: true,
    });
    const sessionId = req.user.sessionId;
    const session = await sessionModel.deleteOne({ _id: sessionId });
}

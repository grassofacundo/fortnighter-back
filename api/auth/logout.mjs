//#region Dependency list
import { sessionModel } from "../../models/session.mjs";
//#endregion

export async function logout(req, res, next) {
    res.cookie("accessToken", "", getCookieProperties());
    res.cookie("refreshToken", "", getCookieProperties());

    const { sessionId } = req.body;

    if (sessionId) await sessionModel.deleteOne({ _id: sessionId });

    res.json({});
}

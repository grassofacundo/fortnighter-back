import { sessionModel } from "../models/session.mjs";
import { setError } from "../utils/error-setter.mjs";
import { signJWT, verifyJWT } from "../utils/jws.mjs";
import { getId } from "../utils/tools.mjs";

export const isAuth = async (req, res, next) => {
    const { accessToken, refreshToken } = req.cookies; //Check, maybe we won't need cookie parser

    try {
        if (accessToken) {
            const { payload, expired } = verifyJWT(accessToken);

            if (payload) {
                req.user = payload;
                return next();
            }
        }

        if (!refreshToken) setError("Token missing", 401);

        const { payload, expired } = verifyJWT(refreshToken);

        if (expired) {
            console.log(
                "I should delete the session from the DB here. Can I do that? I would need the sessionId somehow"
            );
            setError("Token expired", 401);
        }

        if (!payload) setError("Token missing", 401);

        const session = await sessionModel.findById(payload.sessionId);
        if (!session?.isValid) setError("Session is not valid", 401);

        const newTokenPayload = {
            email: session.email,
            userId: session.userId,
            sessionId: getId(session._id),
        };
        const newAccessToken = signJWT(newTokenPayload, "1h");

        res.cookie("accessToken", newAccessToken, {
            SameSite: "None",
            maxAge: 60000 * 60,
            secure: true,
            domain: "https://fortnighter.netlify.app/",
        });
        req.user = newTokenPayload;
    } catch (error) {
        next(error);
    }
    next();
};

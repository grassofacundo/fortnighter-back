import { sessionModel } from "../models/session.mjs";
import { setError } from "../utils/error-setter.mjs";
import { verifyJWT } from "../utils/jws.mjs";
import { getId } from "../utils/tools.mjs";

export const isAuth = async (req, res, next) => {
    const { accessToken, refreshToken } = req.cookies; //Check, maybe we won't need cookie parser

    if (!accessToken) setError("Not authenticated", 401);

    try {
        const { payload, expired } = verifyJWT(accessToken);

        // For a valid access token
        if (payload) {
            req.user = payload;
            next();
        }

        // expired but valid refresh token
        const { payload: refresh } =
            expired && refreshToken
                ? verifyJWT(refreshToken)
                : { payload: null };

        //This means both tokens are expired, so you can't access the site
        //I think it makes sense to delete the session from the DB here,
        //because if we force the user to log in again,
        //a new session will be created in the DB, making the expired one useless.
        if (!refresh) next();

        const session = await sessionModel.findById(refresh.sessionId);

        if (!session || !session.isValid) next();

        const newTokenPayload = {
            email: session.email,
            userId: session.userId,
            sessionId: getId(session._id),
        };
        const newAccessToken = signJWT(newTokenPayload, secret, "1h");

        res.cookie("accessToken", newAccessToken, {
            maxAge: 60000 * 60,
            httpOnly: true,
        });
        req.user = newTokenPayload;
    } catch (error) {
        next(error);
    }
    next();
};

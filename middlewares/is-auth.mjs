import jwt from "jsonwebtoken";

export const isAuth = (req, res, next) => {
    const accessToken = req.headers["authorization"];
    const refreshToken = req.cookies["refreshToken"];

    if (!accessToken && !refreshToken) {
        const error = new Error("Not authenticated");
        error.statusCode = 401;
        throw error;
    }

    const secret = process.env.JSW_SECRET;

    try {
        const decoded = jwt.verify(accessToken, secret);
        req.userId = decoded.user;
    } catch (error) {
        if (!refreshToken) {
            const error = new Error(
                "Access Denied. No refresh token provided."
            );
            error.statusCode = 401;
            throw error;
        }

        try {
            const decoded = jwt.verify(refreshToken, secret);
            const accessToken = jwt.sign({ user: decoded.user }, secret, {
                expiresIn: "1h",
            });

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                sameSite: "strict",
            })
                .header("Authorization", accessToken)
                .send(decoded.user);
        } catch (error) {
            next(error);
        }
    }
    next();
};

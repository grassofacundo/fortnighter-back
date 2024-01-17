export async function refresh(req, res, next) {
    const refreshToken = req.cookies["refreshToken"];
    if (!refreshToken) {
        return res
            .status(401)
            .send("Access Denied. No refresh token provided.");
    }
    try {
        const secret = process.env.JSW_SECRET;
        const decoded = jwt.verify(refreshToken, secret);
        const accessToken = jwt.sign({ user: decoded.user }, secret, {
            expiresIn: "1h",
        });

        res.header("Authorization", accessToken).json({
            user: decoded.user,
        });
    } catch (error) {
        next(error);
    }
}

export const validLogin = [
    body("email")
        .isEmail()
        .withMessage("Enter a valid Email address")
        .normalizeEmail(),
    body("password").not().isEmpty(),
];

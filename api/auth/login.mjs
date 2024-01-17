//#region Dependency list
import bcryptjs from "bcryptjs";
import { validationResult, body } from "express-validator";
import jwt from "jsonwebtoken";
import { setError } from "../../utils/error-setter.mjs";
import { userModel } from "../../models/user.mjs";
//#endregion

export async function login(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) setError("Validation failed", 422, errors.array());

    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) setError("Mail not found as active user", 404);

        const passwordsMatch = await bcryptjs.compare(password, user.password);
        if (!passwordsMatch) setError("Validation failed", 422);

        const userToken = {
            email: user.email,
            userId: user._id.toString(),
        };
        const secret = process.env.JSW_SECRET;

        const accessToken = jwt.sign(userToken, secret, { expiresIn: "1h" });
        const refreshToken = jwt.sign(userToken, secret, { expiresIn: "1d" });

        res.status(200)
            .cookie("refreshToken", refreshToken, {
                httpOnly: true,
                sameSite: "strict",
            })
            .header("Authorization", accessToken)
            .json({
                accessToken,
                user: {
                    name: user.name,
                    email: user.email,
                    jobs: user.jobs,
                },
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

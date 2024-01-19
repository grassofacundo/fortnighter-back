//#region Dependency list
import bcryptjs from "bcryptjs";
import { validationResult, body } from "express-validator";
import { setError } from "../../utils/error-setter.mjs";
import { userModel } from "../../models/user.mjs";
import { signJWT } from "../../utils/jws.mjs";
import { sessionModel } from "../../models/session.mjs";
import { getId } from "../../utils/tools.mjs";
//#endregion

export async function login(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) setError("Validation failed", 422, errors.array());

    const { email, password } = req.body;
    try {
        //Find the user
        const user = await userModel.findOne({ email });
        if (!user) setError("Mail not found as active user", 401);

        //Check password
        const passwordsMatch = await bcryptjs.compare(password, user.password);
        if (!passwordsMatch) setError("Validation failed", 422);

        const session = new sessionModel({
            email,
            userId: getId(user._id),
            isValid: true,
        });
        const savedSession = await session.save();
        const sessionId = getId(savedSession._id);

        const payload = {
            email: user.email,
            userId: getId(user._id),
            sessionId,
        };

        const accessToken = signJWT(payload, "1h");
        const refreshToken = signJWT({ sessionId }, "1y");

        res.status(200)
            .cookie("accessToken", accessToken, {
                SameSite: "None",
                maxAge: 60000 * 60,
                secure: true,
            })
            .cookie("refreshToken", refreshToken, {
                SameSite: "None",
                maxAge: 31536000,
                secure: true,
            })
            .json({
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

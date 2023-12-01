//#region Dependency list
import { validationResult } from "express-validator";
import { setError } from "../../utils/error-setter.mjs";
import bcryptjs from "bcryptjs";
import { body } from "express-validator";
import { userModel } from "../../models/user.mjs";
//#endregion

export async function signup(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) setError("Validation failed", 422, errors.array());

    const { email, password } = req.body;
    try {
        const hashedPassword = await bcryptjs.hash(password, 12);
        const user = new userModel({
            email,
            password: hashedPassword,
        });
        await user.save();
        res.status(201).json({
            message: "User created successfully",
            userId: user._id,
        });
    } catch (error) {
        next(error);
    }
}

export const validSignUp = [
    body("email")
        .isEmail()
        .withMessage("Enter a valid Email address")
        .custom(async (value, { req }) => {
            const userDoc = await userModel.findOne({ email: value });
            if (userDoc) return Promise.reject("Email address already exists");
            return userDoc;
        })
        .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
];

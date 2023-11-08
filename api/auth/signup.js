//#region Dependency list
const { validationResult } = require("express-validator");
const { setError } = require("../../utils/error-setter");
const { hash } = require("bcryptjs");
const { body } = require("express-validator");
const userModel = require("../../models/user");
//#endregion

exports.signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) setError("Validation failed", 422, errors.array());

    const { email, password } = req.body;
    try {
        const hashedPassword = await hash(password, 12);
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
};

exports.validSignUp = [
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

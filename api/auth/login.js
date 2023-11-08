//#region Dependency list
const { compare } = require("bcryptjs");
const userModel = require("../../models/user");
const { validationResult, body } = require("express-validator");
const { sign } = require("jsonwebtoken");
const { setError } = require("../../utils/error-setter");
//#endregion

exports.login = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) setError("Validation failed", 422, errors.array());

    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) setError("Mail not found as active user", 404);

        const passwordsMatch = await compare(password, user.password);
        if (!passwordsMatch) setError("Validation failed", 422);

        const token = sign(
            {
                email: user.email,
                userId: user._id.toString(),
            },
            process.env.JSW_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            token,
            user: {
                name: user.name,
                email: user.email,
                jobs: user.jobs,
            },
        });
    } catch (error) {
        next(error);
    }
};

exports.validLogin = [
    body("email")
        .isEmail()
        .withMessage("Enter a valid Email address")
        .normalizeEmail(),
    body("password").not().isEmpty(),
];

//#region Dependency list
const router = require("express").Router();
const { login, validLogin } = require("../api/auth/login");
const { isAuth } = require("../middlewares/is-auth");
const { signup, validSignUp } = require("../api/auth/signup");
//#endregion

router.post("/signup", validSignUp, signup);
router.post("/login", validLogin, login);

module.exports = router;

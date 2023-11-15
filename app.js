//#region Dependency list
const express = require("express");
//const path = require("path");
require("dotenv").config();
const jobRouter = require("./routes/job");
const AuthRouter = require("./routes/auth");
const bodyParser = require("body-parser");
const { connect } = require("mongoose");
const {
    //headersConfig,
    corsConfig,
    //multerConfig,
} = require("./middlewares/initialization");
const { errorHandler } = require("./middlewares/error");
const { isAuth } = require("./middlewares/is-auth");
const app = express();
//#endregion

/*
 *
 * Initial configuration
 *
 */
app.use("*", corsConfig);
//app.use(multerConfig);
app.use(bodyParser.json());
//app.use("/images", express.static(path.join(__dirname, "images")));
//app.use(headersConfig);

/*
 *
 * AAuthentication check
 *
 */
app.use(new RegExp("^((?!/auth).)*$"), isAuth); //Match every path except for /auth
/*
 *
 * Routes
 *
 */
app.use("/auth", AuthRouter);
app.use("/job", jobRouter);
/*
 *
 * Error handler
 *
 */
app.use(errorHandler);

connect(process.env.MONGOOSE_CONNECTION_STRING)
    .then(() => app.listen(8181))
    .catch((error) => console.error(error));

//#region Dependency list
import express from "express";
import "dotenv/config.js";
import bodyParser from "body-parser";
import { connect } from "mongoose";
import { router as jobRouter } from "./routes/job.mjs";
import { router as authRouter } from "./routes/auth.mjs";
import { router as shiftRouter } from "./routes/shift.mjs";
import { corsConfig } from "./middlewares/initialization.mjs";
import { errorHandler } from "./middlewares/error.mjs";
import { isAuth } from "./middlewares/is-auth.mjs";
//#endregion

/*
 *
 * Initial configuration
 *
 */
const app = express();
app.use("*", corsConfig);
//app.use(multerConfig);
app.use(bodyParser.json());
//app.use("/images", express.static(path.join(__dirname, "images")));

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
app.use("/auth", authRouter);
app.use("/job", jobRouter);
app.use("/shift", shiftRouter);
/*
 *
 * Error handler
 *
 */
app.use(errorHandler);

connect(process.env.MONGOOSE_CONNECTION_STRING)
    .then(() => app.listen(8181))
    .catch((error) => console.error(error));

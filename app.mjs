//#region Dependency list
import express from "express";
import "dotenv/config.js";
import bodyParser from "body-parser";
import { connect } from "mongoose";
import { router as jobRouter } from "./routes/job.mjs";
import { router as paymentRouter } from "./routes/payment.mjs";
import { router as authRouter } from "./routes/auth.mjs";
import { router as shiftRouter } from "./routes/shift.mjs";
import { router as modifierRoute } from "./routes/modifier.mjs";
import { corsConfig } from "./middlewares/initialization.mjs";
import { errorHandler } from "./middlewares/error.mjs";
import { isAuth } from "./middlewares/is-auth.mjs";
import cookieParser from "cookie-parser";
//#endregion

/*
 *
 * Initial configuration
 *
 */
const app = express();
app.use("*", corsConfig);
app.use(cookieParser());
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
app.use("/payment", paymentRouter);
app.use("/shift", shiftRouter);
app.use("/modifier", modifierRoute);
/*
 *
 * Error handler
 *
 */
app.use(errorHandler);

const port = process.env.PORT || 8181;
try {
    connect(process.env.MONGOOSE_CONNECTION_STRING)
        .then(() => {
            console.log("Connected to Mongo DB!");
            console.log(`Listening to port ${port}`);
            app.listen(port);
        })
        .catch((error) => {
            console.error("[CATCH AFTER THEN] Error connecting to Mongo DB");
            console.error(error);
        });
} catch (error) {
    console.error("[GENERAL CATCH] Error connecting to Mongo DB");
    console.error(error);
}

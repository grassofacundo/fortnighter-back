//#region Dependency list
import { Router } from "express";
import { signup, validSignUp } from "../api/auth/signup.mjs";
import { login, validLogin } from "../api/auth/login.mjs";
import { logout } from "../api/auth/logout.mjs";
//#endregion

export const router = Router();
router.post("/signup", validSignUp, signup);
router.post("/login", validLogin, login);
router.delete("/logout", logout);

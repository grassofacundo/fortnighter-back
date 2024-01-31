//#region Dependency list
import { Router } from "express";
import { createModifier } from "../api/modifier/createModifier.mjs";
import { deleteModifier } from "../api/modifier/deleteModifier.mjs";
//#endregion

export const router = Router();
router.put("/create", createModifier);
router.delete("/delete", deleteModifier);

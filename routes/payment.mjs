//#region Dependency list
import { Router } from "express";
import { getAllPayments } from "../api/payment/getAll.mjs";
import { getLastPayment } from "../api/payment/getLast.mjs";
import { createPayment, validCreatePayment } from "../api/payment/create.mjs";
//#endregion

export const router = Router();
router.put("/create", validCreatePayment, createPayment);
router.get("/get-all", getAllPayments);
router.get("/get-last", getLastPayment);

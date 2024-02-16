//#region Dependency list
import { Router } from "express";
import { getPaginationPayments } from "../api/payment/getAll.mjs";
import { getLastPayment } from "../api/payment/getLast.mjs";
import {
    createPayment,
    validCreatePayment,
} from "../api/payment/createPayment.mjs";
//#endregion

export const router = Router();
router.put("/create", validCreatePayment, createPayment);
router.get("/get-all", getPaginationPayments);
router.get("/get-last", getLastPayment);

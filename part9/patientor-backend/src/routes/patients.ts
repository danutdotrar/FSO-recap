import express, { Response } from "express";
const router = express.Router();
import patientsService from "../services/patients";
import { NonSensitivePatients } from "../types";

router.get("/", (_req, res: Response<NonSensitivePatients[]>) => {
    res.send(patientsService.getNonSensitivePatients());
});

export default router;

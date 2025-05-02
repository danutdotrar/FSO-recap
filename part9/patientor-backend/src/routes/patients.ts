import express, { Response } from "express";
const router = express.Router();
import patientsService from "../services/patients";
import { NonSensitivePatients } from "../types";

router.get("/", (_req, res: Response<NonSensitivePatients[]>) => {
    res.send(patientsService.getNonSensitivePatients());
});

// POST request
// Add patients to patients.ts 'db'
// route '/'
router.post("/", (req, res: Response<NonSensitivePatients>) => {
    const body = req.body;

    res.send(patientsService.addNewPatientEntry(body));
});

export default router;

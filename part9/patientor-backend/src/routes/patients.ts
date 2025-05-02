import express, { Response } from "express";
const router = express.Router();
import patientsService from "../services/patients";
import { NonSensitivePatients } from "../types";
import toNewPatientEntry from "../utils";

router.get("/", (_req, res: Response<NonSensitivePatients[]>) => {
    res.send(patientsService.getNonSensitivePatients());
});

// POST request
// Add patients to patients.ts 'db'
// route '/'
router.post("/", (req, res) => {
    try {
        const body = req.body;

        const newPatient = toNewPatientEntry(body);

        res.send(patientsService.addNewPatientEntry(newPatient));
    } catch (error: unknown) {
        let errorMesasge = "Something went wrong.";

        if (error instanceof Error) {
            errorMesasge += " Error: " + error.message;
        }

        res.status(404).send(errorMesasge);
    }
});

export default router;

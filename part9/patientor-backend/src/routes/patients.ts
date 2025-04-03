import express, { Response } from "express";
const router = express.Router();
import patientsService from "../services/patients";
import { NonSensitivePatients, Patients } from "../types";

router.get("/", (_req, res: Response<NonSensitivePatients[]>) => {
    res.send(patientsService.getNonSensitivePatients());
});

// POST req
// '/'
// Add new patients to the patients database
router.post("/", (req, res: Response<Patients>) => {
    const body = req.body;

    // add the patient to the database
    res.send(patientsService.addPatient(body));
});

export default router;

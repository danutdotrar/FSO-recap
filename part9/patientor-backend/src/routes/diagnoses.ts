//import express
// intialize router
// define router endpoints
// export default router
import express, { Response } from "express";
import { Diagnosis } from "../types";
import diagnosisService from "../services/diagnoses";

const router = express.Router();

router.get("/", (_req, res: Response<Diagnosis[]>) => {
    res.send(diagnosisService.getDiagnosisEntries());
});

export default router;

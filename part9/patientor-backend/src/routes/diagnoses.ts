import express, { Response } from "express";
const diagnosesRouter = express.Router();

import diagnosesService from "../services/diagnoses";
import { Diagnosis } from "../types";

diagnosesRouter.get("/", (_req, res: Response<Diagnosis[]>) => {
    res.send(diagnosesService.getDiagnoses());
});

export default diagnosesRouter;

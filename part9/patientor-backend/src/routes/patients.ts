import express, { NextFunction, Request, Response } from "express";
const router = express.Router();
import patientsService from "../services/patients";
import { NewPatientEntry, NonSensitivePatients, Patients } from "../types";
import { NewPatientSchema } from "../utils";
import { z } from "zod";

router.get("/", (_req, res: Response<NonSensitivePatients[]>) => {
    res.send(patientsService.getNonSensitivePatients());
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        NewPatientSchema.parse(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

const errorMiddleware = (
    error: unknown,
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    if (error instanceof z.ZodError) {
        res.status(400).send({ error: error.issues });
    } else {
        next(error);
    }
};

// POST request
// Add patients to patients.ts 'db'
// route '/'
router.post(
    "/",
    newPatientParser,
    (
        req: Request<unknown, unknown, NewPatientEntry>,
        res: Response<Patients>
    ) => {
        const body = req.body;

        res.send(patientsService.addNewPatientEntry(body));
    }
);

router.use(errorMiddleware);

export default router;

import express, { Response } from "express";
const router = express.Router();
import patientsService from "../services/patients";
import { NonSensitivePatients } from "../types";

router.get("/", (_req, res: Response<NonSensitivePatients[]>) => {
    res.send(patientsService.getNonSensitivePatients());
});

// POST req
// '/'
// Add new patients to the patients database
router.post("/", (_req, _res) => {
    // take the fields from the req.body
    // check if all the fields have the correct type
    // create new object containing the fields and add a unique id
    // add new created entry to the database
    // return new created entry
});

export default router;

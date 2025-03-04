import express from "express";
const router = express.Router();
import patientsService from "../services/patients";

router.get("/", (_req, res) => {
    res.send(patientsService.getNonSensitivePatients());
});

export default router;

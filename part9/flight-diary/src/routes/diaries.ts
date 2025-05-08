import express from "express";
import diaryService from "../services/diaryService";
import { Response } from "express";
import { NonSensitiveDiaryEntry } from "../types";
import { NewEntrySchema } from "../utils";
import { z } from "zod";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitiveDiaryEntry[]>) => {
    res.send(diaryService.getNonSensitiveEntries());
});

router.get("/:id", (req, res) => {
    const id: number = Number(req.params.id);

    const diary = diaryService.findById(id);

    try {
        res.send(diary);
    } catch (error: unknown) {
        let errorMessage = "Something bad happened";

        // narrowing error to access 'message' property
        if (error instanceof Error) {
            errorMessage += ` :${error.message}`;
        }

        res.sendStatus(400).send(errorMessage);
    }
});

router.post("/", (req, res) => {
    try {
        const newDiaryEntry = NewEntrySchema.parse(req.body);
        const addedEntry = diaryService.addDiary(newDiaryEntry);

        res.json(addedEntry);
    } catch (error: unknown) {
        if (error instanceof z.ZodError) {
            res.status(400).send({ error: error.issues });
        } else {
            res.status(400).send({ error: "unknown error" });
        }
    }
});

export default router;

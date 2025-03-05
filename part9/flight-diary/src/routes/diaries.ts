import express from "express";
import diaryService from "../services/diaryService";
import { Response } from "express";
import { NonSensitiveDiaryEntry } from "../types";

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
    const { date, weather, visibility, comment } = req.body;

    const addedEntry = diaryService.addDiary({
        date,
        weather,
        visibility,
        comment,
    });

    res.json(addedEntry);
});

export default router;

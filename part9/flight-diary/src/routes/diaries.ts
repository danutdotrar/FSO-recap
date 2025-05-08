import express, { NextFunction, Request } from "express";
import diaryService from "../services/diaryService";
import { Response } from "express";
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from "../types";
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

// middleware function
const newDiaryParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        NewEntrySchema.parse(req.body);
        next(); // go to the route handler
    } catch (error: unknown) {
        // if the validation fails, express will jump to the next middleware with (error, req, res, next)
        next(error); // go to the error middleware
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

router.post(
    "/",
    newDiaryParser,
    (
        req: Request<unknown, unknown, NewDiaryEntry>,
        res: Response<DiaryEntry>
    ) => {
        const addedEntry = diaryService.addDiary(req.body);
        res.json(addedEntry);
    }
);

router.use(errorMiddleware);

export default router;

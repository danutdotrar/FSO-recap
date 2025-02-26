import express from "express";
const app = express();
app.use(express.json());

import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

app.get("/endpoint", (_req, res) => {
    res.send("Hello Full Stack!");
});

// app.get("/bmi", (req: Request, res: Response) => {
//     const params = req.query;

//     const height: number = Number(params.height);
//     const weight: number = Number(params.weight);

//     if (isNaN(height) || isNaN(weight)) {
//         res.status(400).json({ error: "malformatted parameters" });
//     }

//     try {
//         const bmiResult: string = calculateBmi(height, weight);
//         res.json({ height, weight, bmi: bmiResult });
//     } catch (error: unknown) {
//         let errorMessage = "error: ";
//         if (error instanceof Error) {
//             errorMessage += error.message;
//         }
//         res.json({ error: errorMessage });
//     }
// });

app.get("/bmi", (req, res) => {
    const params = req.query;

    const height: number = Number(params.height);
    const weight: number = Number(params.weight);

    if (isNaN(height) || isNaN(weight)) {
        res.status(400).send({ error: "malformatted parameters" });
    }

    const bmiResult: string = calculateBmi(height, weight);
    res.send({ height, weight, bmi: bmiResult });
});

app.post("/exercises", (req, res) => {
    const { daily_exercises, target } = req.body;

    if (!daily_exercises || !target) {
        res.status(400).send({ error: "parameters missing" });
    }

    if (isNaN(Number(target))) {
        res.status(400).send({ error: "malformatted parameters" });
    }

    // check if some items are not numbers
    const hasWrongItem = daily_exercises.some((day: number) =>
        isNaN(Number(day))
    );

    if (!Array.isArray(daily_exercises) || hasWrongItem) {
        res.status(400).send({ error: "malformatted parameters" });
    }

    try {
        const result = calculateExercises(daily_exercises, target);
        res.send(result);
    } catch (error: unknown) {
        let errorMessage = "Something bad happend.";

        if (error instanceof Error) {
            errorMessage += ` ${error.message}`;
        }

        res.status(400).send({ error: errorMessage });
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

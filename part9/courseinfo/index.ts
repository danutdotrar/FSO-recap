// const express = require("express");
import express from "express";
const app = express();
app.use(express.json());

import { calculator, Operation } from "./calculator";

app.get("/ping", (_req, res) => {
    res.send("pong");
});

app.get("/", (_req, res) => {
    res.send("this is the home page");
});

app.post("/calculate", (req, res) => {
    const { value1, value2, op } = req.body;

    if (!value1 || !isNaN(value1) || !value2 || !isNaN(value2)) {
        res.status(400).send({ error: "bad values" });
    }

    // type assertion
    const operation = op as Operation;

    const result = calculator(Number(value1), Number(value2), operation);
    res.send({ result });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

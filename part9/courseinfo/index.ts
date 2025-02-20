// const express = require("express");
import express from "express";
const app = express();

app.get("/ping", (_req, res) => {
    res.send("pong");
});

app.get("/", (_req, res) => {
    res.send("this is the home page");
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

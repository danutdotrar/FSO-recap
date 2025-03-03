import express from "express";
const app = express();

// parse JSON into JS object
app.use(express.json());

app.get("/ping", (_req, res) => {
    console.log("pinged here");
    res.send("pong");
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

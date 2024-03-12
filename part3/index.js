// require express
const express = require("express");

// create express application stored in app variable
const app = express();

// define sample API
let notes = [
    {
        id: 1,
        content: "HTML is easy",
        important: true,
    },
    {
        id: 2,
        content: "Browser can execute only JavaScript",
        important: false,
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true,
    },
];

// GET '/'
// request contine toate informatiile despre request-ul HTTP
// response defineste cum este folosit request-ul
app.get("/", (request, response) => {
    response.send(JSON.stringify(notes));
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);

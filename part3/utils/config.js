require("dotenv").config();

const PORT = process.env.PORT;
const MONBODB_URI = process.env.MONBODB_URI;

module.exports = { PORT, MONBODB_URI };

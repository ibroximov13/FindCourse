const express = require("express");
const { connectDb } = require("./config/db");

const app = express();
require("dotenv").config()
app.use(express.json());

connectDb();

const indexRoute = require("./routes/index");
app.use("/api", indexRoute);

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server started has been on PORT: ${PORT}`)
});
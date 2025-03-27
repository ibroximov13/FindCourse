const express = require("express");
const { connectDb } = require("./config/db");
// const { initData } = require("./utils/initData");
const { fullData } = require("./utils/fullData");
const setupSwagger = require("./config/swagger");
const indexRoute = require("./routes/index");

const app = express();
require("dotenv").config();
app.use(express.json());
setupSwagger(app);

app.use("/image", [
    express.static("uploads/uploadUser"),
]);

app.use("/api", indexRoute);

connectDb();
// initData();
fullData();

const PORT = process.env.DB_PORT 
app.listen(PORT, () => {
    console.log(`Server has been started on PORT: ${PORT}`)
});
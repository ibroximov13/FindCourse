const express = require("express");
const { connectDb } = require("./config/db");
const { initData } = require("./config/initData");
const route = require("./routes/index");
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
initData();

const PORT = process.env.DB_PORT || 3001
app.listen(PORT, () => {
    console.log(`Server has been started on PORT: ${PORT}`);
});
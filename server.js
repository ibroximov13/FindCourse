const express = require("express");
const { connectDb } = require("./config/db");
const { initData } = require("./utils/initData");
const indexRoute = require("./routes/index");
const setupSwagger = require("./config/swagger");

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

const PORT = process.env.PORT 
app.listen(PORT, () => {
    console.log(`Server has been started on PORT: ${PORT}`);
});
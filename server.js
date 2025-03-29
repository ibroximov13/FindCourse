const express = require("express");
const cors = require("cors");
const { connectDb } = require("./config/db");
// const { initData } = require("./utils/initData");
const { fullData } = require("./utils/fullData");
const setupSwagger = require("./config/swagger");
const indexRoute = require("./routes/index");

const app = express();
require("dotenv").config();

app.use(cors({
    origin: "*", 
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization"
}));

app.use(express.json());
setupSwagger(app);

app.use("/image", [
    express.static("uploads/uploadUser"),
]);

app.use("/api", indexRoute);

connectDb();
// initData();
fullData();

const PORT = process.env.DB_PORT || 3001;
const HOST = process.env.HOST || "0.0.0.0"; 

app.listen(PORT, HOST, () => {
    console.log(`Server has been started on http://${HOST}:${PORT}`);
});

const express = require("express");
const { connectDb } = require("./config/db");
const { initData } = require("./config/initData");
const regionRoutes = require("./routes/region.routes"); 

const app = express();
require("dotenv").config();
app.use(express.json());

connectDb();
initData();

app.use("/api", regionRoutes);

const PORT = process.env.PORT 
app.listen(PORT, () => {
    console.log(`Server has been started on PORT: ${PORT}`);
});
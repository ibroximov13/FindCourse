const express = require("express");
<<<<<<< HEAD
require("dotenv").config();
const app = express();
app.use(express.json());
const PORT = process.env.DB_PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server started has been on PORT: ${PORT}`);
=======
const { connectDb } = require("./config/db");

const app = express();
require("dotenv").config()
app.use(express.json());

connectDb();


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server started has been on PORT: ${PORT}`)
>>>>>>> Xusniddin
});
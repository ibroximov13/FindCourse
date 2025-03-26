const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());
const PORT = process.env.DB_PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server started has been on PORT: ${PORT}`);
});
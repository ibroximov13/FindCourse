const {Router} = require("express");
const { createCategory, updateCategory, deleteCategory, getAllCategory, getOneCategory } = require("../controllers/category.controller");

const route = Router();

route.post("/", createCategory);
route.patch("/:id", updateCategory);
route.delete("/:id", deleteCategory);
route.get("/", getAllCategory);
route.get("/:id", getOneCategory);

module.exports = route;

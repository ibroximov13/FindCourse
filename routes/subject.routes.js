const {Router} = require("express");
const { createSubject, updateSubject, deleteSubject } = require("../controllers/subject.controller");
const route = Router();

route.post("/", createSubject);
route.patch("/:id", updateSubject);
route.delete("/:id", deleteSubject);
// route.get("/", getAllBranchs);
// route.get("/:id", getOneBranch);

module.exports = route;

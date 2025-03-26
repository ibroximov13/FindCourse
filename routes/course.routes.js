const {Router} = require("express");
const { createCourse, updateCourse, deleteCourse } = require("../controllers/course.controller");
const route = Router();

route.post("/", createCourse);
route.patch("/:id", updateCourse);
route.delete("/:id", deleteCourse);
// route.get("/", getAllBranchs);
// route.get("/:id", getOneBranch);

module.exports = route;

const {Router} = require("express");
const { createNewBranch, updateBranch } = require("../controllers/branch.controller");
const route = Router();

route.post("/", createNewBranch);
route.patch("/:id", updateBranch)

module.exports = route;

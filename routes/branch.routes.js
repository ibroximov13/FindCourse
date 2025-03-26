const {Router} = require("express");
const { createNewBranch, updateBranch, deleteBranch, getAllBranchs, getOneBranch } = require("../controllers/branch.controller");
const route = Router();

route.post("/", createNewBranch);
route.patch("/:id", updateBranch);
route.delete("/:id", deleteBranch);
route.get("/", getAllBranchs);
route.get("/:id", getOneBranch);

module.exports = route;

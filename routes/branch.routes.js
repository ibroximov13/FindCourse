const {Router} = require("express");
const route = Router();

route.post("/", createNewBranch)

module.exports = route;

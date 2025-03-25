const route = require("express").Router();

route.use("/branch", require("./branch.routes"));


module.exports = route
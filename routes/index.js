const route = require("express").Router();

route.use("/branch", require("./branch.routes"));
route.use('/users', require('./user.routes'));

module.exports = route
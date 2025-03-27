const route = require("express").Router();

route.use("/branch", require("./branch.routes"));
route.use('/users', require('./user.routes'));
route.use('/regions', require('./1.region.routes')); 


module.exports = route
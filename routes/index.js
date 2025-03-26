const route = require("express").Router();

route.use("/branchs", require("./branch.routes"));
route.use('/users', require('./user.routes'));
route.use("/subjects", require("./subject.routes"));
route.use("/resources", require("./resource.routes"));
route.use("/category", require("./category.routes"));
route.use("/course", require("./course.routes"));

module.exports = route
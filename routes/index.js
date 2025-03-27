const route = require("express").Router();

route.use("/branches", require("./branch.routes"));
route.use('/users', require('./user.routes'));
route.use("/subjects", require("./subject.routes"));
route.use("/resources", require("./resource.routes"));
route.use("/categories", require("./category.routes"));
route.use("/courses", require("./course.routes"));
route.use("/center", require("./center.routes"));
route.use("/enrollments", require("./enrollment.routes"));
route.use("/regions", require("./region.routes"));
route.use("/likes", require("./like.routes"));
route.use("/myself", require("./mySelf.routes"));
module.exports = route
const route = require("express").Router();

route.use("/branches", require("./branch.routes"));
route.use('/users', require('./user.routes'));
route.use("/subjects", require("./subject.routes"));
route.use("/resourse", require("./resource.routes"));
route.use("/category", require("./category.routes"));
route.use("/course", require("./course.routes"));
route.use("/center", require("./center.routes"));
route.use("/enrollment", require("./enrollment.routes"));
route.use("/region", require("./region.routes"));
route.use("/likes", require("./like.routes"));

module.exports = route
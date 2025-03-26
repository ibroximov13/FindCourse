const {Router} = require("express");
const { createResource, updateResourse, deleteResource, getAllResource, getOneResource } = require("../controllers/resource.controller");
const route = Router();

route.post("/", createResource);
route.patch("/:id", updateResourse);
route.delete("/:id", deleteResource);
route.get("/", getAllResource);
route.get("/:id", getOneResource);

module.exports = route;

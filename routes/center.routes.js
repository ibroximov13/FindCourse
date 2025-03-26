const express = require("express");
const router = express.Router();
const centerController = require("../controllers/center.controller");
const { createCenterValidation, updateCenterValidation } = require("../validation/center.validate");
const validate = require("../middlewares/");

router.post("/", validate(createCenterValidation), centerController.createCenter);

router.get("/", centerController.getAllCenters);

router.get("/:id", centerController.getCenterById);

router.put("/:id", validate(updateCenterValidation), centerController.updateCenter);

router.patch("/:id", validate(updateCenterValidation), centerController.patchCenter);

router.delete("/:id", centerController.deleteCenter);

module.exports = router;
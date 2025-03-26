const express = require("express");
const router = express.Router();
const regionController = require("../controllers/region.controller");

router.post("/", regionController.createRegion);
router.get("/", regionController.getAllRegions);
router.get("/:id", regionController.getRegionById);
router.put("/:id", regionController.updateRegion);
router.patch("/:id", regionController.patchRegion);
router.delete("/:id", regionController.deleteRegion);

module.exports = router;
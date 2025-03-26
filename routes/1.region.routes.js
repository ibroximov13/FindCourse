const express = require("express");
const router = express.Router();
const { getRegions } = require("../controllers/region.controller");

router.get("/regions", getRegions);

module.exports = router;
const express = require("express");
const router = express.Router();
const enrollmentController = require("../controllers/enrollment.controller");

router.post("/", enrollmentController.createEnrollment);
router.get("/", enrollmentController.getAllEnrollments);
router.get("/:id", enrollmentController.getEnrollmentById);
router.put("/:id", enrollmentController.updateEnrollment);
router.patch("/:id", enrollmentController.patchEnrollment);
router.delete("/:id", enrollmentController.deleteEnrollment);

module.exports = router;
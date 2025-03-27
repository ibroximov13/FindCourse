const express = require("express");
const router = express.Router();
const enrollmentController = require("../controllers/enrollment.controller");
const verifyTokenAndRole = require("../middlewares/verifyTokenAndRole");

/**
 * @swagger
 * /enrollments:
 *   post:
 *     summary: Create a new enrollment
 *     tags: [Enrollments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - courseId
 *               - status
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               courseId:
 *                 type: integer
 *                 example: 5
 *               status:
 *                 type: string
 *                 example: "active"
 *     responses:
 *       201:
 *         description: Enrollment created successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 10
 *               userId: 1
 *               courseId: 5
 *               status: "active"
 *       400:
 *         description: Validation error
 */
router.post("/", verifyTokenAndRole(["USER", "ADMIN", "SUPERADMIN", "CEO"]), enrollmentController.createEnrollment);

/**
 * @swagger
 * /enrollments:
 *   get:
 *     summary: Get all enrollments
 *     tags: [Enrollments]
 *     responses:
 *       200:
 *         description: List of enrollments
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 userId: 1
 *                 courseId: 5
 *                 status: "active"
 *               - id: 2
 *                 userId: 2
 *                 courseId: 6
 *                 status: "completed"
 */
router.get("/", enrollmentController.getAllEnrollments);

/**
 * @swagger
 * /enrollments/{id}:
 *   get:
 *     summary: Get enrollment by ID
 *     tags: [Enrollments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Enrollment ID
 *     responses:
 *       200:
 *         description: Enrollment data
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               userId: 1
 *               courseId: 5
 *               status: "active"
 *       404:
 *         description: Enrollment not found
 */
router.get("/:id", enrollmentController.getEnrollmentById);

/**
 * @swagger
 * /enrollments/{id}:
 *   patch:
 *     summary: Partially update enrollment by ID
 *     tags: [Enrollments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Enrollment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: "cancelled"
 *     responses:
 *       200:
 *         description: Enrollment partially updated
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               userId: 2
 *               courseId: 7
 *               status: "cancelled"
 *       404:
 *         description: Enrollment not found
 */
router.patch("/:id", verifyTokenAndRole(["ADMIN", "SUPERADMIN", "CEO"]), enrollmentController.patchEnrollment);

/**
 * @swagger
 * /enrollments/{id}:
 *   delete:
 *     summary: Delete enrollment by ID
 *     tags: [Enrollments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Enrollment ID
 *     responses:
 *       200:
 *         description: Enrollment deleted
 *         content:
 *           application/json:
 *             example:
 *               message: Enrollment deleted successfully
 *       404:
 *         description: Enrollment not found
 */
router.delete("/:id",verifyTokenAndRole(["ADMIN", "SUPERADMIN", "CEO"]), enrollmentController.deleteEnrollment);

module.exports = router;
const express = require("express");
const router = express.Router();
const enrollmentController = require("../controllers/enrollment.controller");
const verifyTokenAndRole = require("../middlewares/verifyTokenAndRole");

router.post("/", verifyTokenAndRole(["USER", "ADMIN", "SUPERADMIN", "CEO"]), enrollmentController.createEnrollment);

/**
 * @swagger
 * /enrollments:
 *   post:
 *     summary: Create a new enrollment
 *     tags: [Enrollments]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - centerId
 *             properties:
 *               centerId:
 *                 type: integer
 *                 example: 1
 *               courseId:
 *                 type: integer
 *                 example: 5
 *               subjectId:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       201:
 *         description: Enrollment created successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 10
 *               userId: 1
 *               centerId: 1
 *               courseId: 5
 *               subjectId: 3
 *               createdAt: "2025-04-03T12:00:00Z"
 *       400:
 *         description: Validation error or missing courseId/subjectId
 *       500:
 *         description: Server error
 */
router.get("/", enrollmentController.getAllEnrollments);

/**
 * @swagger
 * /enrollments:
 *   get:
 *     summary: Get all enrollments with pagination and sorting
 *     tags: [Enrollments]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: take
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: column
 *         schema:
 *           type: string
 *           enum: [id, userId, courseId, subjectId, centerId, createdAt]
 *           default: id
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *           default: ASC
 *     responses:
 *       200:
 *         description: List of enrollments with related data
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 userId: 1
 *                 centerId: 1
 *                 courseId: 5
 *                 subjectId: null
 *                 createdAt: "2025-04-03T12:00:00Z"
 *               - id: 2
 *                 userId: 2
 *                 centerId: 2
 *                 courseId: null
 *                 subjectId: 4
 *                 createdAt: "2025-04-03T12:01:00Z"
 */
router.get("/:id", enrollmentController.getEnrollmentById);

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
 *               centerId: 1
 *               courseId: 5
 *               subjectId: null
 *               createdAt: "2025-04-03T12:00:00Z"
 *       404:
 *         description: Enrollment not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", verifyTokenAndRole(["ADMIN", "SUPERADMIN", "CEO"]), enrollmentController.deleteEnrollment);

/**
 * @swagger
 * /enrollments/{id}:
 *   delete:
 *     summary: Delete enrollment by ID
 *     tags: [Enrollments]
 *     security:
 *       - BearerAuth: []
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
 *               message: "enrollment deleted successfully"
 *       404:
 *         description: Enrollment not found
 *       500:
 *         description: Server error
 */

module.exports = router;
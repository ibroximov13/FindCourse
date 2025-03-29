const express = require("express");
const router = express.Router();
const enrollmentController = require("../controllers/enrollment.controller");
const verifyTokenAndRole = require("../middlewares/verifyTokenAndRole");

/**
/**
 * @swagger
 * /enrollments/months:
 *   get:
 *     summary: Get all months with pagination and sorting
 *     tags: [Enrollments]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: 📄 Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: 🔢 Number of months per page
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *           default: DESC
 *         description: 📌 Sort order by ID (ASC or DESC)
 *     responses:
 *       200:
 *         description: List of months with pagination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *             example:
 *               total: 12
 *               totalPages: 2
 *               currentPage: 1
 *               data:
 *                 - id: 1
 *                   name: "January"
 *                 - id: 2
 *                   name: "February"
 *                 - id: 3
 *                   name: "March"
 *                 - id: 4
 *                   name: "April"
 *                 - id: 5
 *                   name: "May"
 *                 - id: 6
 *                   name: "June"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal server error"
 */
router.get("/months", enrollmentController.getAllMonths)

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
 *               - courseId
 *               - subjectId
 *               - monthId
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
 *               monthId:
 *                 type: integer
 *                 example: 12
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
 *               monthId: 12
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post("/", verifyTokenAndRole(["USER", "ADMIN", "SUPERADMIN", "CEO"]), enrollmentController.createEnrollment);

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
 *           enum: [id, userId, courseId, subjectId, centerId, date]
 *           default: id
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *           default: ASC
 *     responses:
 *       201:
 *         description: List of enrollments with related data
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 userId: 1
 *                 centerId: 1
 *                 courseId: 5
 *                 subjectId: 3
 *                 monthId: 12
 *               - id: 2
 *                 userId: 2
 *                 centerId: 2
 *                 courseId: 6
 *                 subjectId: 4
 *                 monthId: 11
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
 *               centerId: 1
 *               courseId: 5
 *               subjectId: 3
 *               monthId: 12
 *       404:
 *         description: Enrollment not found
 *       500:
 *         description: Server error
 */
router.get("/:id", enrollmentController.getEnrollmentById);

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
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "enrollment delete successfully"
 *       404:
 *         description: Enrollment not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", verifyTokenAndRole(["ADMIN", "SUPERADMIN", "CEO"]), enrollmentController.deleteEnrollment);

module.exports = router;
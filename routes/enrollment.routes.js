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
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - courseId
 *             properties:
 *               courseId:
 *                 type: integer
 *                 example: 5
 *               centerId:
 *                 type: integer
 *                 example: 1
 *               subjectId:
 *                 type: integer
 *                 example: 2
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-03-27"
 *     responses:
 *       201:
 *         description: Enrollment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 enrollment:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     userId:
 *                       type: integer
 *                     courseId:
 *                       type: integer
 *                     centerId:
 *                       type: integer
 *                     subjectId:
 *                       type: integer
 *                     date:
 *                       type: string
 *                       format: date
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
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   userId:
 *                     type: integer
 *                   courseId:
 *                     type: integer
 *                   centerId:
 *                     type: integer
 *                   subjectId:
 *                     type: integer
 *                   date:
 *                     type: string
 *                     format: date
 *                   Center:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                   Course:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       phone:
 *                         type: string
 *                       location:
 *                         type: string
 *       500:
 *         description: Server error
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
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 userId:
 *                   type: integer
 *                 courseId:
 *                   type: integer
 *                 centerId:
 *                   type: integer
 *                 subjectId:
 *                   type: integer
 *                 date:
 *                   type: string
 *                   format: date
 *       404:
 *         description: Enrollment not found
 *       500:
 *         description: Server error
 */
router.get("/:id", enrollmentController.getEnrollmentById);

/**
 * @swagger
 * /enrollments/{id}:
 *   patch:
 *     summary: Partially update enrollment by ID
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseId:
 *                 type: integer
 *               centerId:
 *                 type: integer
 *               subjectId:
 *                 type: integer
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Enrollment partially updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     userId:
 *                       type: integer
 *                     courseId:
 *                       type: integer
 *                     centerId:
 *                       type: integer
 *                     subjectId:
 *                       type: integer
 *                     date:
 *                       type: string
 *                       format: date
 *       400:
 *         description: Validation error
 *       404:
 *         description: Enrollment not found
 *       500:
 *         description: Server error
 */
router.patch("/:id", verifyTokenAndRole(["ADMIN", "SUPERADMIN", "CEO"]), enrollmentController.patchEnrollment);

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
const { Router } = require("express");
const { createSubject, updateSubject, deleteSubject, getAllSubjects, getOneSubject } = require("../controllers/subject.controller");
const verifyTokenAndRole = require("../middlewares/verifyTokenAndRole");

const route = Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     CreateSubject:
 *       type: object
 *       required:
 *         - name
 *         - image
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *           maxLength: 30
 *           example: Mathematics
 *         image:
 *           type: string
 *           example: http://example.com/images/math.jpg
 *     UpdateSubject:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *           maxLength: 30
 *           example: Advanced Mathematics
 *         image:
 *           type: string
 *           example: http://example.com/images/advanced-math.jpg
 *     SubjectResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Mathematics
 *         image:
 *           type: string
 *           example: http://example.com/images/math.jpg
 */

/**
 * @swagger
 * /api/subjects:
 *   post:
 *     summary: Create a new subject
 *     tags: [Subjects]
 *     description: Creates a new subject (Accessible by ADMIN, CEO)
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateSubject'
 *     responses:
 *       201:
 *         description: Subject created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubjectResponse'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Required role (ADMIN, CEO) not met
 */
route.post("/", verifyTokenAndRole(["ADMIN", "CEO"]), createSubject);

/**
 * @swagger
 * /api/subjects/{id}:
 *   patch:
 *     summary: Update subject
 *     tags: [Subjects]
 *     description: Updates an existing subject (Accessible by ADMIN, SUPERADMIN, CEO)
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Subject ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateSubject'
 *     responses:
 *       200:
 *         description: Subject updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubjectResponse'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Required role (ADMIN, SUPERADMIN, CEO) not met
 *       404:
 *         description: Subject not found
 */
route.patch("/:id", verifyTokenAndRole(["ADMIN", "SUPERADMIN", "CEO"]), updateSubject);

/**
 * @swagger
 * /api/subjects/{id}:
 *   delete:
 *     summary: Delete subject
 *     tags: [Subjects]
 *     description: Deletes a subject by ID (Accessible by ADMIN, CEO)
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Subject ID
 *     responses:
 *       200:
 *         description: Subject deleted successfully
 *       400:
 *         description: Invalid ID
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Required role (ADMIN, CEO) not met
 *       404:
 *         description: Subject not found
 */
route.delete("/:id", verifyTokenAndRole(["ADMIN", "CEO"]), deleteSubject);

/**
 * @swagger
 * /api/subjects:
 *   get:
 *     summary: Get all subjects
 *     tags: [Subjects]
 *     description: Retrieves a list of all subjects (Public access)
 *     responses:
 *       200:
 *         description: List of subjects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SubjectResponse'
 */
route.get("/", getAllSubjects);

/**
 * @swagger
 * /api/subjects/{id}:
 *   get:
 *     summary: Get subject by ID
 *     tags: [Subjects]
 *     description: Retrieves a single subject by its ID (Public access)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Subject ID
 *     responses:
 *       200:
 *         description: Subject details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubjectResponse'
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Subject not found
 */
route.get("/:id", getOneSubject);

module.exports = route;
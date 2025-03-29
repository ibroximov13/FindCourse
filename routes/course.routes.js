const { Router } = require("express");
const { createCourse, updateCourse, deleteCourse, getAllCourse, getOneCourse, uploadImage } = require("../controllers/course.controller");
const verifyTokenAndRole = require("../middlewares/verifyTokenAndRole");
const upload = require("../multer/course.multer");

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
 *     CreateCourse:
 *       type: object
 *       required:
 *         - name
 *         - image
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *           maxLength: 30
 *           example: Web Development
 *         image:
 *           type: string
 *           example: http://example.com/images/web-dev.jpg
 *     UpdateCourse:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *           maxLength: 30
 *           example: Advanced Web Development
 *         image:
 *           type: string
 *           example: http://example.com/images/advanced-web-dev.jpg
 *     CourseResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Web Development
 *         image:
 *           type: string
 *           example: http://example.com/images/web-dev.jpg
 */

/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     description: Creates a new course (Admin only)
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCourse'
 *     responses:
 *       201:
 *         description: Course created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CourseResponse'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 */
route.post("/", verifyTokenAndRole(["ADMIN"]), createCourse);

/**
 * @swagger
 * /courses/{id}:
 *   patch:
 *     summary: Update course
 *     tags: [Courses]
 *     description: Updates an existing course (Admin only)
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Course ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCourse'
 *     responses:
 *       200:
 *         description: Course updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CourseResponse'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Course not found
 */
route.patch("/:id", verifyTokenAndRole(["ADMIN"]), updateCourse);

/**
 * @swagger
 * /courses/{id}:
 *   delete:
 *     summary: Delete course
 *     tags: [Courses]
 *     description: Deletes a course by ID (Admin only)
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Course ID
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *       400:
 *         description: Invalid ID
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Course not found
 */
route.delete("/:id", verifyTokenAndRole(["ADMIN"]), deleteCourse);

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Retrieve a list of courses
 *     tags: [Courses]
 *     description: Fetches a paginated list of courses with optional filtering and sorting.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of courses to return per page
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *           default: ""
 *         description: Filter courses by name (partial match)
 *       - in: query
 *         name: column
 *         schema:
 *           type: string
 *           enum: [id, name]
 *           default: id
 *         description: Column to sort by
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *           default: ASC
 *         description: Sort order (ascending or descending)
 *     responses:
 *       200:
 *         description: A list of courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CourseResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred while fetching courses
 */
route.get("/", getAllCourse);

/**
 * @swagger
 * /courses/{id}:
 *   get:
 *     summary: Get course by ID
 *     tags: [Courses]
 *     description: Retrieves a single course by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Course ID
 *     responses:
 *       200:
 *         description: Course details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CourseResponse'
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Course not found
 */
route.get("/:id", getOneCourse);

/**
 * @swagger
 * /courses/upload-image:
 *   post:
 *     summary: Upload user image
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               userImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded successfully.
 */
route.post("/upload-image", upload.single("userImage"), uploadImage);

module.exports = route;
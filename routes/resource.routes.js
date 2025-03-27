const { Router } = require("express");
const { createResource, updateResourse, deleteResource, getAllResource, getOneResource } = require("../controllers/resource.controller");
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
 *     CreateResource:
 *       type: object
 *       required:
 *         - name
 *         - image
 *         - description
 *         - media
 *         - userId
 *         - categoryId
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *           maxLength: 30
 *           example: Resource Title
 *         image:
 *           type: string
 *           example: http://example.com/images/resource.jpg
 *         description:
 *           type: string
 *           minLength: 3
 *           example: This is a sample resource description
 *         media:
 *           type: string
 *           example: http://example.com/media/resource-video.mp4
 *         userId:
 *           type: integer
 *           example: 1
 *         categoryId:
 *           type: integer
 *           example: 2
 *     UpdateResource:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *           maxLength: 30
 *           example: Updated Resource Title
 *         image:
 *           type: string
 *           example: http://example.com/images/updated-resource.jpg
 *         description:
 *           type: string
 *           minLength: 3
 *           example: This is an updated resource description
 *         media:
 *           type: string
 *           example: http://example.com/media/updated-resource-video.mp4
 *         userId:
 *           type: integer
 *           example: 2
 *         categoryId:
 *           type: integer
 *           example: 3
 *     ResourceResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Resource Title
 *         image:
 *           type: string
 *           example: http://example.com/images/resource.jpg
 *         description:
 *           type: string
 *           example: This is a sample resource description
 *         media:
 *           type: string
 *           example: http://example.com/media/resource-video.mp4
 *         userId:
 *           type: integer
 *           example: 1
 *         categoryId:
 *           type: integer
 *           example: 2
 */

/**
 * @swagger
 * /resources:
 *   post:
 *     summary: Create a new resource
 *     tags: [Resources]
 *     description: Creates a new resource (Accessible by USER, ADMIN, SUPERADMIN, CEO)
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateResource'
 *     responses:
 *       201:
 *         description: Resource created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResourceResponse'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Required role not met
 */
route.post("/", verifyTokenAndRole(["USER", "ADMIN", "SUPERADMIN", "CEO"]), createResource);

/**
 * @swagger
 * /resources/{id}:
 *   patch:
 *     summary: Update resource
 *     tags: [Resources]
 *     description: Updates an existing resource (Accessible by USER, ADMIN, SUPERADMIN, CEO)
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Resource ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateResource'
 *     responses:
 *       200:
 *         description: Resource updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResourceResponse'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Required role not met
 *       404:
 *         description: Resource not found
 */
route.patch("/:id", verifyTokenAndRole(["USER", "ADMIN", "SUPERADMIN", "CEO"]), updateResourse);

/**
 * @swagger
 * /resources/{id}:
 *   delete:
 *     summary: Delete resource
 *     tags: [Resources]
 *     description: Deletes a resource by ID (Accessible by USER, ADMIN, SUPERADMIN, CEO)
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Resource ID
 *     responses:
 *       200:
 *         description: Resource deleted successfully
 *       400:
 *         description: Invalid ID
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Required role not met
 *       404:
 *         description: Resource not found
 */
route.delete("/:id", verifyTokenAndRole(["USER", "ADMIN", "SUPERADMIN", "CEO"]), deleteResource);

/**
 * @swagger
 * /resources:
 *   get:
 *     summary: Get all resources
 *     tags: [Resources]
 *     description: Retrieves a list of all resources (Accessible by USER, ADMIN, SUPERADMIN, CEO)
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of resources
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ResourceResponse'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Required role not met
 */
route.get("/", verifyTokenAndRole(["USER", "ADMIN", "SUPERADMIN", "CEO"]), getAllResource);

/**
 * @swagger
 * /resources/{id}:
 *   get:
 *     summary: Get resource by ID
 *     tags: [Resources]
 *     description: Retrieves a single resource by its ID (Accessible by USER, ADMIN, SUPERADMIN, CEO)
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Resource ID
 *     responses:
 *       200:
 *         description: Resource details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResourceResponse'
 *       400:
 *         description: Invalid ID
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Required role not met
 *       404:
 *         description: Resource not found
 */
route.get("/:id", verifyTokenAndRole(["USER", "ADMIN", "SUPERADMIN", "CEO"]), getOneResource);

module.exports = route;
const { Router } = require("express")
const { getMyEnrollment, getMyCenter, getMyResource, getMyComments } = require("../controllers/mySelf.controller");
const verifyTokenAndRole = require("../middlewares/verifyTokenAndRole");
const route = Router();

/**
 * @swagger
 * /myself/my-comments:
 *   get:
 *     summary: Get user's comments
 *     tags: [MySelf]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       404:
 *         description: No comments found
 *       500:
 *         description: Internal server error
 */
route.get("/my-comments", verifyTokenAndRole(["ADMIN", "USER", "SUPERADMIN", "CEO"]), getMyComments);

/**
 * @swagger
 * /myself/my-resources:
 *   get:
 *     summary: Get user's resources
 *     tags: [MySelf]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved resources
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Resource'
 *       404:
 *         description: No resources found
 *       500:
 *         description: Internal server error
 */
route.get("/my-resources", verifyTokenAndRole(["ADMIN", "USER", "SUPERADMIN", "CEO"]), getMyResource);

/**
 * @swagger
 * /myself/my-centers:
 *   get:
 *     summary: Get user's centers
 *     tags: [MySelf]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved centers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Center'
 *       404:
 *         description: No centers found
 *       500:
 *         description: Internal server error
 */
route.get("/my-centers", verifyTokenAndRole(["ADMIN", "CEO"]), getMyCenter);

// /**
//  * @swagger
//  * /myself/my-enrollments:
//  *   get:
//  *     summary: Get user's enrollments
//  *     tags: [MySelf]
//  *     security:
//  *       - BearerAuth: []
//  *     responses:
//  *       200:
//  *         description: Successfully retrieved enrollments
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/Enrollment'
//  *       404:
//  *         description: No enrollments found
//  *       500:
//  *         description: Internal server error
//  */
// route.get("/my-enrollments", verifyTokenAndRole(["ADMIN", "CEO"]), getMyEnrollment);

module.exports = route
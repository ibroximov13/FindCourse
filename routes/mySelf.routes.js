const { Router } = require("express");
const { getAll } = require("../controllers/mySelf.controller");
const verifyTokenAndRole = require("../middlewares/verifyTokenAndRole");
const route = Router();

/**
 * @swagger
 * /myself:
 *   get:
 *     summary: Get current user's details
 *     description: Retrieves information about the authenticated user, including their comments and associated centers with courses.
 *     tags: [MyProfile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fullName:
 *                   type: string
 *                   example: John Doe
 *                 image:
 *                   type: string
 *                   example: https://example.com/image.jpg
 *                 email:
 *                   type: string
 *                   example: john.doe@example.com
 *                 phone:
 *                   type: string
 *                   example: +1234567890
 *                 password:
 *                   type: string
 *                   example: hashedpassword123
 *                 comments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       message:
 *                         type: string
 *                         example: Great course!
 *                       star:
 *                         type: integer
 *                         example: 5
 *                 centers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: Learning Center A
 *                       courseItems:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 1
 *                             course:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: integer
 *                                   example: 1
 *                                 name:
 *                                   type: string
 *                                   example: Intro to Programming
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User does not have required role
 *       500:
 *         description: Server error
 */
route.get("/", verifyTokenAndRole(["USER", "ADMIN", "SUPERADMIN", "CEO"]), getAll);

module.exports = route;
const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment.controller");
const verifyTokenAndRole = require("../middlewares/verifyTokenAndRole");

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: ✍️ Create a new comment
 *     tags: [💬 Comments]
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
 *               - message
 *               - star
 *             properties:
 *               centerId:
 *                 type: integer
 *                 example: 5
 *                 description: 🏢 Center ID related to the comment
 *               message:
 *                 type: string
 *                 example: "Great post! Very informative."
 *                 description: 💬 Comment text
 *               star:
 *                 type: integer
 *                 example: 4
 *                 description: ⭐ Rating (e.g., 1-5 stars)
 *     responses:
 *       201:
 *         description: ✅ Comment created successfully
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
 *                     centerId:
 *                       type: integer
 *                     message:
 *                       type: string
 *                     star:
 *                       type: integer
 *             example:
 *               message: "comment created successfully"
 *               data:
 *                 id: 25
 *                 centerId: 5
 *                 message: "Great post! Very informative."
 *                 star: 4
 *       400:
 *         description: ⚠️ Validation error or bad request
 *         content:
 *           application/json:
 *             example:
 *               message: "Validation error: message is required"
 *       401:
 *         description: 🚫 Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             example:
 *               message: "Token not found"
 *       403:
 *         description: ⛔ Forbidden - Insufficient role permissions (USER, ADMIN, SUPERADMIN, CEO)
 *         content:
 *           application/json:
 *             example:
 *               message: "Unfortunately, you do not have sufficient rights."
 */

router.post("/", verifyTokenAndRole(["USER", "ADMIN", "SUPERADMIN", "CEO"]), commentController.createComment);

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: 📜 Get all comments
 *     tags: [💬 Comments]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *         description: 🧑 Filter by user ID
 *       - in: query
 *         name: centerId
 *         schema:
 *           type: integer
 *         description: 🏢 Filter by center ID
 *       - in: query
 *         name: star
 *         schema:
 *           type: integer
 *         description: ⭐ Filter by star rating
 *       - in: query
 *         name: messageSearch
 *         schema:
 *           type: string
 *         description: 🔍 Search comments by message content
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: 📄 Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: 🔢 Number of comments per page
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *           default: DESC
 *         description: 📌 Sort order by ID (ASC or DESC)
 *     responses:
 *       200:
 *         description: ✅ List of comments
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
 *                       userId:
 *                         type: integer
 *                       centerId:
 *                         type: integer
 *                       message:
 *                         type: string
 *                       star:
 *                         type: integer
 *             example:
 *               total: 2
 *               totalPages: 1
 *               currentPage: 1
 *               data:
 *                 - id: 1
 *                   userId: 2
 *                   centerId: 3
 *                   message: "I really liked this article."
 *                   star: 5
 *                 - id: 2
 *                   userId: 5
 *                   centerId: 7
 *                   message: "Thanks for sharing this!"
 *                   star: 4
 *       500:
 *         description: 💥 Server error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal server error"
 */
router.get("/", commentController.getAllComments);

/**
 * @swagger
 * /comments/{id}:
 *   get:
 *     summary: 🔎 Get comment by ID
 *     tags: [💬 Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: 🆔 Comment ID
 *     responses:
 *       200:
 *         description: ✅ Comment found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 userId:
 *                   type: integer
 *                 centerId:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 star:
 *                   type: integer
 *             example:
 *               id: 1
 *               userId: 2
 *               centerId: 3
 *               message: "I really liked this article."
 *               star: 5
 *       400:
 *         description: ⚠️ Bad request - Invalid ID format
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid comment ID provided"
 *       404:
 *         description: ❓ Comment not found
 *         content:
 *           application/json:
 *             example:
 *               message: "comment not found"
 *       500:
 *         description: 💥 Server error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal server error"
 */
router.get("/:id", commentController.getCommentById);

/**
 * @swagger
 * /comments/{id}:
 *   patch:
 *     summary: ✏️ Partially update comment by ID
 *     tags: [💬 Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: 🆔 Comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Updated message."
 *               star:
 *                 type: integer
 *                 example: 3
 *             description: 💬 Fields to partially update (message and/or star)
 *     responses:
 *       200:
 *         description: ✅ Comment partially updated
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
 *                     centerId:
 *                       type: integer
 *                     message:
 *                       type: string
 *                     star:
 *                       type: integer
 *             example:
 *               message: "comment partially updated"
 *               data:
 *                 id: 1
 *                 userId: 4
 *                 centerId: 5
 *                 message: "Updated message."
 *                 star: 3
 *       400:
 *         description: ⚠️ Validation error or bad request
 *         content:
 *           application/json:
 *             example:
 *               message: "Validation error: message must be a string"
 *       404:
 *         description: ❓ Comment not found
 *         content:
 *           application/json:
 *             example:
 *               message: "comment not found"
 */
router.patch("/:id", commentController.patchComment);

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: 🗑️ Delete comment by ID
 *     tags: [💬 Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: 🆔 Comment ID
 *     responses:
 *       200:
 *         description: ✅ Comment deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "comment deleted successfully"
 *       404:
 *         description: ❓ Comment not found
 *         content:
 *           application/json:
 *             example:
 *               message: "comment not found"
 *       500:
 *         description: 💥 Server error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal server error"
 */
router.delete("/:id", commentController.deleteComment);

module.exports = router;
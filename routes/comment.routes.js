const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment.controller");
const verifyTokenAndRole = require("../middlewares/verifyTokenAndRole");

/**
 * @swagger
 * /api/comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - postId
 *               - message
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 3
 *               postId:
 *                 type: integer
 *                 example: 12
 *               message:
 *                 type: string
 *                 example: "Great post! Very informative."
 *     responses:
 *       201:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 25
 *               userId: 3
 *               postId: 12
 *               message: "Great post! Very informative."
 *       400:
 *         description: Validation error
 */
router.post("/", commentController.createComment);

/**
 * @swagger
 * /api/comments:
 *   get:
 *     summary: Get all comments
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: List of comments
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 userId: 2
 *                 postId: 11
 *                 message: "I really liked this article."
 *               - id: 2
 *                 userId: 5
 *                 postId: 9
 *                 message: "Thanks for sharing this!"
 */
router.get("/", commentController.getAllComments);

/**
 * @swagger
 * /api/comments/{id}:
 *   get:
 *     summary: Get comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Comment data
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               userId: 2
 *               postId: 11
 *               message: "I really liked this article."
 *       404:
 *         description: Comment not found
 */
router.get("/:id", commentController.getCommentById);

/**
 * @swagger
 * /api/comments/{id}:
 *   patch:
 *     summary: Partially update comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Partially updated message."
 *     responses:
 *       200:
 *         description: Comment partially updated
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               userId: 4
 *               postId: 15
 *               message: "Partially updated message."
 *       404:
 *         description: Comment not found
 */
router.patch("/:id", commentController.patchComment);

/**
 * @swagger
 * /api/comments/{id}:
 *   delete:
 *     summary: Delete comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Comment deleted
 *         content:
 *           application/json:
 *             example:
 *               message: Comment deleted successfully
 *       404:
 *         description: Comment not found
 */
router.delete("/:id", commentController.deleteComment);

module.exports = router;
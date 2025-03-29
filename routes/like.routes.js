const express = require("express");
const router = express.Router();
const likeController = require("../controllers/like.controller");
const verifyTokenAndRole = require("../middlewares/verifyTokenAndRole");

/**
 * @swagger
 * /likes:
 *   post:
 *     summary: Create a new like
 *     tags: [Likes]
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
 *     responses:
 *       201:
 *         description: Like created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "like created successfully"
 *               data:
 *                 id: 1
 *                 userId: 1
 *                 centerId: 1
 *       400:
 *         description: Validation error or already liked
 *         content:
 *           application/json:
 *             example:
 *               error: "You have already liked this center"
 */
router.post("/", verifyTokenAndRole(["USER", "ADMIN", "SUPERADMIN", "CEO"]), likeController.createLike);

/**
 * @swagger
 * /likes:
 *   get:
 *     summary: Get all likes sorted by centerId
 *     tags: [Likes]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *         description: Filter by user ID
 *       - in: query
 *         name: centerId
 *         schema:
 *           type: integer
 *         description: Filter by center ID
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Items per page
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *           default: DESC
 *         description: Sort order by centerId
 *     responses:
 *       200:
 *         description: List of likes
 *         content:
 *           application/json:
 *             example:
 *               total: 2
 *               totalPages: 1
 *               currentPage: 1
 *               data:
 *                 - id: 1
 *                   userId: 1
 *                   centerId: 1
 *                 - id: 2
 *                   userId: 2
 *                   centerId: 2
 */
router.get("/", likeController.getAllLikes);

/**
 * @swagger
 * /likes/{id}:
 *   delete:
 *     summary: Delete like by ID
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Like ID
 *     responses:
 *       200:
 *         description: Like deleted
 *         content:
 *           application/json:
 *             example:
 *               message: "like deleted successfully"
 *       404:
 *         description: Like not found
 */
router.delete("/:id", verifyTokenAndRole(["USER", "ADMIN", "SUPERADMIN", "CEO"]), likeController.deleteLike);

module.exports = router;
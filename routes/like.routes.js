const express = require("express");
const router = express.Router();
const likeController = require("../controllers/like.controller");
const verifyTokenAndRole = require("../middlewares/verifyTokenAndRole");

/**
 * @swagger
 * /api/likes:
 *   post:
 *     summary: Create a new like
 *     tags: [Likes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - postId
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               postId:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       201:
 *         description: Like created successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 5
 *               userId: 1
 *               postId: 10
 *       400:
 *         description: Validation error
 */
router.post("/", verifyTokenAndRole(["USER", "ADMIN", "SUPERADMIN", "CEO"]), likeController.createLike);

/**
 * @swagger
 * /api/likes:
 *   get:
 *     summary: Get all likes
 *     tags: [Likes]
 *     responses:
 *       200:
 *         description: List of likes
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 userId: 1
 *                 postId: 10
 *               - id: 2
 *                 userId: 2
 *                 postId: 11
 */
router.get("/", likeController.getAllLikes);

/**
 * @swagger
 * /api/likes/{id}:
 *   get:
 *     summary: Get like by ID
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Like ID
 *     responses:
 *       200:
 *         description: Like data
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               userId: 1
 *               postId: 10
 *       404:
 *         description: Like not found
 */
router.get("/:id", likeController.getLikeById);


/**
 * @swagger
 * /api/likes/{id}:
 *   patch:
 *     summary: Partially update like by ID
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Like ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 3
 *               postId:
 *                 type: integer
 *                 example: 13
 *     responses:
 *       200:
 *         description: Like partially updated
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               userId: 3
 *               postId: 13
 *       404:
 *         description: Like not found
 */
router.patch("/:id", verifyTokenAndRole(["USER", "ADMIN", "SUPERADMIN", "CEO"]), likeController.patchLike);

/**
 * @swagger
 * /api/likes/{id}:
 *   delete:
 *     summary: Delete like by ID
 *     tags: [Likes]
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
 *               message: Like deleted successfully
 *       404:
 *         description: Like not found
 */
router.delete("/:id", verifyTokenAndRole(["USER", "ADMIN", "SUPERADMIN", "CEO"]), likeController.deleteLike);

module.exports = router;
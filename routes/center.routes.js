const express = require("express");
const router = express.Router();
const centerController = require("../controllers/center.controller");

/**
 * @swagger
 * /api/centers:
 *   post:
 *     summary: Create a new center
 *     tags: [Centers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Olmazor Center"
 *               regionId:
 *                 type: integer
 *                 example: 2
 *               address:
 *                 type: string
 *                 example: "Olmazor tumani, 34-uy"
 *               phone:
 *                 type: string
 *                 example: "+998901234567"
 *               location:
 *                 type: string
 *                 example: "41.311081, 69.240562"
 *     responses:
 *       201:
 *         description: Center created
 *       400:
 *         description: Bad request
 */
router.post("/", centerController.createCenter);

/**
 * @swagger
 * /api/centers:
 *   get:
 *     summary: Get all centers with pagination and filters
 *     tags: [Centers]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Items per page
 *         example: 10
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by name
 *         example: "Olmazor"
 *       - in: query
 *         name: regionId
 *         schema:
 *           type: integer
 *         description: Filter by regionId
 *         example: 2
 *     responses:
 *       200:
 *         description: List of centers
 */
router.get("/", centerController.getAllCenters);

/**
 * @swagger
 * /api/centers/{id}:
 *   get:
 *     summary: Get center by ID
 *     tags: [Centers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Center ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Center data
 *       404:
 *         description: Center not found
 */
router.get("/:id", centerController.getCenterById);

/**
 * @swagger
 * /api/centers/{id}:
 *   put:
 *     summary: Fully update center by ID
 *     tags: [Centers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Center ID
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Center"
 *               regionId:
 *                 type: integer
 *                 example: 3
 *               address:
 *                 type: string
 *                 example: "Yangi manzil, 10-uy"
 *               phone:
 *                 type: string
 *                 example: "+998907654321"
 *               location:
 *                 type: string
 *                 example: "41.311000, 69.240000"
 *     responses:
 *       200:
 *         description: Center fully updated
 *       404:
 *         description: Center not found
 */
router.put("/:id", centerController.updateCenter);

/**
 * @swagger
 * /api/centers/{id}:
 *   patch:
 *     summary: Partially update center by ID
 *     tags: [Centers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Center ID
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "+998998889977"
 *     responses:
 *       200:
 *         description: Center partially updated
 *       404:
 *         description: Center not found
 */
router.patch("/:id", centerController.patchCenter);

/**
 * @swagger
 * /api/centers/{id}:
 *   delete:
 *     summary: Delete center by ID
 *     tags: [Centers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Center ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Center deleted
 *       404:
 *         description: Center not found
 */
router.delete("/:id", centerController.deleteCenter);

module.exports = router;
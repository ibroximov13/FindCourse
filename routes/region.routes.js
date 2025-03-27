const express = require("express");
const router = express.Router();
const regionController = require("../controllers/region.controller");
const verifyTokenAndRole = require("../middlewares/verifyTokenAndRole");
/**
 * @swagger
 * /regions:
 *   post:
 *     summary: Create a new region
 *     tags: [Regions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 100
 *                 example: Tashkent
 *             examples:
 *               region:
 *                 value:
 *                   name: Tashkent
 *     responses:
 *       201:
 *         description: Region created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *               example:
 *                 id: 1
 *                 name: Tashkent
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             example:
 *               message: "Name must be between 2 and 100 characters"
 *       401:
 *         description: Unauthorized - Admin access required
 *         content:
 *           application/json:
 *             example:
 *               message: "Token not found or invalid"
 */
router.post("/", verifyTokenAndRole(["ADMIN"]), regionController.createRegion);

/**
 * @swagger
 * /regions:
 *   get:
 *     summary: Get all regions
 *     tags: [Regions]
 *     responses:
 *       200:
 *         description: List of regions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                 example:
 *                   id: 1
 *                   name: Tashkent
 */
router.get("/", regionController.getAllRegions);

/**
 * @swagger
 * /regions/{id}:
 *   get:
 *     summary: Get region by ID
 *     tags: [Regions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Region ID
 *     responses:
 *       200:
 *         description: Region found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *               example:
 *                 id: 1
 *                 name: Tashkent
 *       404:
 *         description: Region not found
 */
router.get("/:id", regionController.getRegionById);

/**
 * @swagger
 * /regions/{id}:
 *   patch:
 *     summary: Partially update region by ID
 *     tags: [Regions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Region ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 100
 *                 example: Fergana
 *             examples:
 *               region:
 *                 value:
 *                   name: Fergana
 *     responses:
 *       200:
 *         description: Region partially updated
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               name: Fergana
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized - Admin or Superadmin access required
 *       404:
 *         description: Region not found
 */
router.patch("/:id", verifyTokenAndRole(["ADMIN", "SUPERADMIN"]), regionController.patchRegion);

/**
 * @swagger
 * /regions/{id}:
 *   delete:
 *     summary: Delete region by ID
 *     tags: [Regions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Region ID
 *     responses:
 *       200:
 *         description: Region deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Region deleted successfully
 *       401:
 *         description: Unauthorized - Admin access required
 *       404:
 *         description: Region not found
 */
router.delete("/:id", verifyTokenAndRole(["ADMIN"]), regionController.deleteRegion);

module.exports = router;
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
 *                 example: Tashkent
 *     responses:
 *       201:
 *         description: Region created successfully
 *       400:
 *         description: Validation error
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
 *             example:
 *               - id: 1
 *                 name: Tashkent
 *               - id: 2
 *                 name: Samarkand
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
 *         description: Region ID
 *     responses:
 *       200:
 *         description: Region found
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               name: Tashkent
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
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
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
 *                 example: Fergana
 *     responses:
 *       200:
 *         description: Region partially updated
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               name: Fergana
 *       404:
 *         description: Region not found
 */
router.patch("/:id", verifyTokenAndRole([ "ADMIN", "SUPERADMIN", ]), regionController.patchRegion);

/**
 * @swagger
 * /regions/{id}:
 *   delete:
 *     summary: Delete region by ID
 *     tags: [Regions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Region ID
 *     responses:
 *       200:
 *         description: Region deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Region deleted successfully
 *       404:
 *         description: Region not found
 */
router.delete("/:id", verifyTokenAndRole([ "ADMIN" ]), regionController.deleteRegion);

module.exports = router;
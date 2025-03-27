const express = require("express");
const router = express.Router();
const regionController = require("../controllers/region.controller");
const verifyTokenAndRole = require("../middlewares/verifyTokenAndRole");

/**
 * @swagger
 * /regions:
 *   post:
 *     summary: 🌟 Create a new region
 *     tags: [🌍 Regions]
 *     security:
 *       - BearerAuth: []
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
 *                   name: 🏙️ Tashkent
 *     responses:
 *       201:
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
 *                 name: 🏙️ Tashkent
 *       400:
 *         description: ⚠️ Validation error
 *         content:
 *           application/json:
 *             example:
 *               message: "Name must be between 2 and 100 characters 😕"
 *       401:
 *         description: 🔒 Unauthorized - Admin access required
 *         content:
 *           application/json:
 *             example:
 *               message: "Token not found or invalid 🚫"
 */
router.post("/", verifyTokenAndRole(["ADMIN"]), regionController.createRegion);

/**
 * @swagger
 * /regions:
 *   get:
 *     summary: 🌎 Get all regions
 *     tags: [🌍 Regions]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: 🔍 Search by region name
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
 *           default: 15
 *         description: 🔢 Results per page
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *           default: ASC
 *         description: 📌 Sort order (ASC or DESC)
 *     responses:
 *       200:
 *         description: ✅ Successfully retrieved regions
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
 *                       name:
 *                         type: string
 *             example:
 *               total: 3
 *               totalPages: 1
 *               currentPage: 1
 *               data:
 *                 - id: 1
 *                   name: 🏙️ Tashkent
 *                 - id: 2
 *                   name: 🕌 Samarkand
 *                 - id: 3
 *                   name: 🏛️ Bukhara
 */
router.get("/", regionController.getAllRegions);

/**
 * @swagger
 * /regions/{id}:
 *   get:
 *     summary: 🔎 Get region by ID
 *     tags: [🌍 Regions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: 🆔 Region ID
 *     responses:
 *       200:
 *         description: ✅ Region found
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
 *                 name: 🏙️ Tashkent
 *       404:
 *         description: ❓ Region not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Region not found 😔"
 */
router.get("/:id", regionController.getRegionById);

/**
 * @swagger
 * /regions/{id}:
 *   patch:
 *     summary: ✏️ Partially update region by ID
 *     tags: [🌍 Regions]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: 🆔 Region ID
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
 *                   name: 🌄 Fergana
 *     responses:
 *       200:
 *         description: ✅ Region partially updated
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               name: 🌄 Fergana
 *       400:
 *         description: ⚠️ Validation error
 *         content:
 *           application/json:
 *             example:
 *               error: "Name must be between 2 and 100 characters 😕"
 *       401:
 *         description: 🔒 Unauthorized - Admin or Superadmin access required
 *         content:
 *           application/json:
 *             example:
 *               message: "Token not found or invalid 🚫"
 *       404:
 *         description: ❓ Region not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Region not found 😔"
 */
router.patch("/:id", verifyTokenAndRole(["ADMIN", "SUPERADMIN"]), regionController.patchRegion);

/**
 * @swagger
 * /regions/{id}:
 *   delete:
 *     summary: 🗑️ Delete region by ID
 *     tags: [🌍 Regions]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: 🆔 Region ID
 *     responses:
 *       200:
 *         description: ✅ Region deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Region deleted successfully 🎉"
 *       401:
 *         description: 🔒 Unauthorized - Admin access required
 *         content:
 *           application/json:
 *             example:
 *               message: "Token not found or invalid 🚫"
 *       404:
 *         description: ❓ Region not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Region not found 😔"
 */
router.delete("/:id", verifyTokenAndRole(["ADMIN"]), regionController.deleteRegion);

module.exports = router;
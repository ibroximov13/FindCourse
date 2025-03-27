const express = require("express");
const router = express.Router();
const { getRegions } = require("../controllers/region.controller");

/**
 * @swagger
 * tags:
 *   name: Regions
 *   description: "Hududlar (Regions) ma'lumotlarini olish"
 */

/**
 * @swagger
 * /regions:
 *   get:
 *     summary: "Barcha hududlar (regions) ro‘yxatini olish"
 *     tags: [Regions]
 *     responses:
 *       200:
 *         description: "Hududlar muvaffaqiyatli qaytarildi"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Toshkent"
 *       500:
 *         description: "Ichki server xatosi"
 */
router.get("/", getRegions);


module.exports = router;
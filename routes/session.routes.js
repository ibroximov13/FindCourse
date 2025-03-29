const express = require("express");
const { getAllSessions, getMySession, getOneSession, deleteSession } = require("../controllers/session.controller");
const verifyTokenAndRole = require("../middlewares/verifyTokenAndRole");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Sessions
 *   description: Foydalanuvchi sessiyalarini boshqarish
 */

/**
 * @swagger
 * /sessions:
 *   get:
 *     summary: Barcha sessiyalarni olish (faqat adminlar uchun)
 *     tags: [Sessions]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Barcha sessiyalar ro‘yxati
 *       403:
 *         description: Ruxsat yo‘q (faqat adminlar uchun)
 */
router.get("/", getAllSessions);

/**
 * @swagger
 * /sessions/me:
 *   get:
 *     summary: Joriy foydalanuvchining sessiyasini olish
 *     tags: [Sessions]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Foydalanuvchining sessiyasi
 *       401:
 *         description: Token noto‘g‘ri yoki sessiya topilmadi
 */
router.get("/me", getMySession);

/**
 * @swagger
 * /sessions/{id}:
 *   get:
 *     summary: Ma’lum bir sessiyani ID orqali olish
 *     tags: [Sessions]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Sessiya ID-si
 *     responses:
 *       200:
 *         description: Sessiya topildi
 *       404:
 *         description: Sessiya topilmadi
 */
router.get("/:id", verifyTokenAndRole(['ADMIN']), getOneSession);

/**
 * @swagger
 * /sessions/{id}:
 *   delete:
 *     summary: Sessiyani o‘chirish
 *     tags: [Sessions]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Sessiya ID-si
 *     responses:
 *       200:
 *         description: Sessiya muvaffaqiyatli o‘chirildi
 *       404:
 *         description: Sessiya topilmadi
 */
router.delete("/:id", deleteSession);

module.exports = router;

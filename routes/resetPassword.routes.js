const { Router } = require("express");
const { sendOtpResetPassword, verifyOtpResetPassword, } = require("../controllers/resetPassword.controller");
const verifyTokenAndRole = require("../middlewares/verifyTokenAndRole");
const route = Router();

/**
 * @swagger
 * /password/resent-password-otp:
 *   post:
 *     summary: Send OTP for password reset
 *     description: Sends a one-time password to the user's email for password reset
 *     tags: [Reset-password]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 otp:
 *                   type: string
 *                   example: "123456"
 *       404:
 *         description: User not found
 *       422:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
route.post("/resent-password-otp", verifyTokenAndRole(["USER", "ADMIN", "SUPERADMIN", "CEO"]), sendOtpResetPassword);

/**
 * @swagger
 * /password/reset-password-verify:
 *   post:
 *     summary: Verify OTP and reset password
 *     description: Verifies OTP and updates user's password
 *     tags: [Reset-password]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               otp:
 *                 type: string
 *                 example: "123456"
 *               newPassword:
 *                 type: string
 *                 example: "newSecurePass123!"
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Invalid OTP
 *       404:
 *         description: User not found
 *       422:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
route.post("/reset-password-verify", verifyTokenAndRole(["USER", "ADMIN", "SUPERADMIN", "CEO"]), verifyOtpResetPassword);

module.exports = route;
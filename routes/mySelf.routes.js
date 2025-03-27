// routes/myself.route.js
const { Router } = require("express");
const { getAll, sendOtpResetPassword, verifyOtpResetPassword, updateImageUser, updateImageUploads } = require("../controllers/mySelf.controller");
const verifyTokenAndRole = require("../middlewares/verifyTokenAndRole");
const route = Router();

/**
 * @swagger
 * /myself:
 *   get:
 *     summary: Get current user's details
 *     description: Retrieves information about the authenticated user, including their comments and associated centers with courses
 *     tags: [MyProfile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fullName:
 *                   type: string
 *                   example: John Doe
 *                 image:
 *                   type: string
 *                   example: https://example.com/profile.jpg
 *                 email:
 *                   type: string
 *                   example: john.doe@example.com
 *                 phone:
 *                   type: string
 *                   example: +1234567890
 *                 comments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       message:
 *                         type: string
 *                         example: Great course!
 *                       star:
 *                         type: integer
 *                         example: 5
 *                 centers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: Learning Center A
 *                       courseItems:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 1
 *                             course:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: integer
 *                                   example: 1
 *                                 name:
 *                                   type: string
 *                                   example: Intro to Programming
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - Insufficient permissions
 *       500:
 *         description: Internal server error
 */
route.get("/", verifyTokenAndRole(["USER", "ADMIN", "SUPERADMIN", "CEO"]), getAll);

/**
 * @swagger
 * /myself/resent-password-otp:
 *   post:
 *     summary: Send OTP for password reset
 *     description: Sends a one-time password to the user's email for password reset
 *     tags: [MyProfile]
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
 * /myself/reset-password-verify:
 *   post:
 *     summary: Verify OTP and reset password
 *     description: Verifies OTP and updates user's password
 *     tags: [MyProfile]
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

/**
 * @swagger
 * /myself/update-image-user:
 *   post:
 *     summary: Update user profile image
 *     description: Updates the user's profile image URL
 *     tags: [MyProfile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 example: "https://example.com/new-profile.jpg"
 *     responses:
 *       200:
 *         description: Image updated successfully
 *       404:
 *         description: User not found
 *       422:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
route.post("/update-image-user", verifyTokenAndRole(["USER", "ADMIN", "SUPERADMIN", "CEO"]), updateImageUser);

/**
 * @swagger
 * /myself/update-image-uploads:
 *   post:
 *     summary: Upload user image
 *     description: Uploads a new image file for the user
 *     tags: [MyProfile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Rasm muvaffaqiyatli yuklandi"
 *                 url:
 *                   type: string
 *                   example: "http://localhost:3000/image/uploaded-image.jpg"
 *       400:
 *         description: No file uploaded
 *       500:
 *         description: Internal server error
 */
route.post("/update-image-uploads", verifyTokenAndRole(["USER", "ADMIN", "SUPERADMIN", "CEO"]), updateImageUploads);

module.exports = route;
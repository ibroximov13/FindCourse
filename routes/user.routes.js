
const { Router } = require("express");
const { sendOtp, verifyOtp, register, uploadImage, refreshToken, loginUser, getAllUsers, updateUser, deleteUser, getMeProfile, updateMyProfile, downloadUsersExcel, createAdminOrSuperAdmin } = require("../controllers/user.controller");
const upload = require("../multer/user.multer");
const verifyTokenAndRole = require("../middlewares/verifyTokenAndRole");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /users/send-otp:
 *   post:
 *     summary: Send OTP to user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "+998910128133"
 *               email:
 *                 type: string
 *                 example: "ilyosbekibroximov23@gmail.com"
 *     responses:
 *       200:
 *         description: OTP sent successfully.
 */
router.post('/send-otp', sendOtp);

/**
 * @swagger
 * /users/verify-otp:
 *   post:
 *     summary: Verify OTP
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "+998910128133"
 *               email:
 *                 type: string
 *                 example: "ilyosbekibroximov23@gmail.com"
 *               otp:
 *                 type: string
 *                 example: "1234"
 *     responses:
 *       200:
 *         description: OTP verified successfully.
 */
router.post('/verify-otp', verifyOtp);

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: "Kimdir"
 *               year:
 *                 type: integer
 *                 example: 2000
 *               password:
 *                 type: string
 *                 example: "123456"
 *               phone:
 *                 type: string
 *                 example: "+998910128133"
 *               email:
 *                 type: string
 *                 example: "ilyosbekibroximov23@gmail.com"
 *               regionId:
 *                 type: integer
 *                 example: 1
 *               photo:
 *                 type: string
 *                 example: "image.png"
 *               role: 
 *                 type: string
 *                 example: "USER"
 *     responses:
 *       201:
 *         description: User registered successfully.
 */
router.post('/register', register);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "+998901234567"
 *               email:
 *                 type: string
 *                 example: "admin@example.com"
 *               password:
 *                 type: string
 *                 example: "admin123"
 *               userIp: 
 *                 type: string
 *                 example: "123.12"
 *     responses:
 *       200:
 *         description: User logged in successfully.
 */
router.post("/login", loginUser);

/**
 * @swagger
 * /users/upload-image:
 *   post:
 *     summary: Upload user image
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               userImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded successfully.
 */
router.post("/upload-image", upload.single("userImage"), uploadImage);

/**
 * @swagger
 * /users/refresh:
 *   post:
 *     summary: Refresh authentication token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *                 description: The refresh token
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: The new access token
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Bad request (missing or invalid token)
 *       401:
 *         description: Unauthorized (invalid or expired refresh token)
 */

router.post("/refresh", refreshToken);
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Users
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: "Page number for pagination (default: 1)"
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: "Number of users per page (default: 10)"
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: "Filter users by full name"
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *         description: "Sort order (default: ASC)"
 *       - in: query
 *         name: column
 *         schema:
 *           type: string
 *         description: "Column to sort by (default: id)"
 *     responses:
 *       200:
 *         description: "List of users"
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
 *                   fullName:
 *                     type: string
 *                     example: "John Doe"
 *                   year:
 *                     type: integer
 *                     example: 1995
 *                   phone:
 *                     type: string
 *                     example: "+998901234567"
 *                   email:
 *                     type: string
 *                     example: "johndoe@example.com"
 *                   photo:
 *                     type: string
 *                     example: "https://example.com/uploads/johndoe.jpg"
 *                   role:
 *                     type: string
 *                     enum: [USER, ADMIN, SUPERADMIN, CEO]
 *                     example: "USER"
 *                   Region:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Tashkent"
 */


router.get("/", getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Update user details
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully.
 */
router.patch("/:id", updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully.
 */
router.delete("/:id", deleteUser);
/**
 * 
 * @swagger
 * /users/createAdminOrSuperAdmin:
 *   post:
 *     summary: Yangi Admin yoki SuperAdmin yaratish
 *     tags: [Users]
 *     description: "Faqat ADMIN roli bor foydalanuvchilar Admin yoki SuperAdmin yaratishi mumkin. RegionId bu rolda kiritilmaydi."
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - year
 *               - phone
 *               - email
 *               - password
 *               - photo
 *               - role
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: "John Doe"
 *               year:
 *                 type: integer
 *                 minimum: 1900
 *                 maximum: 2025
 *                 description: "Foydalanuvchi tug'ilgan yili. Yosh 15 dan katta bo'lishi kerak."
 *                 example: 1990
 *               phone:
 *                 type: string
 *                 pattern: "^\\+998[0-9]{9}$"
 *                 example: "+998901234567"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "StrongP@ssw0rd"
 *               photo:
 *                 type: string
 *                 example: "https://example.com/photo.jpg"
 *               role:
 *                 type: string
 *                 enum: ["ADMIN", "SUPERADMIN"]
 *                 description: "Faqat ADMIN yoki SUPERADMIN qiymatlari qabul qilinadi."
 *                 example: "SUPERADMIN"
 *     responses:
 *       201:
 *         description: "Admin yoki SuperAdmin muvaffaqiyatli yaratildi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     fullName:
 *                       type: string
 *                       example: "John Doe"
 *                     phone:
 *                       type: string
 *                       example: "+998901234567"
 *                     email:
 *                       type: string
 *                       example: "johndoe@example.com"
 *                     role:
 *                       type: string
 *                       example: "SUPERADMIN"
 *       400:
 *         description: "Xato kiritilgan ma'lumotlar yoki foydalanuvchi allaqachon mavjud"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User already exists"
 *       403:
 *         description: "Ruxsat yo‘q"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Admin yoki SuperAdmin yaratishga ruxsatingiz yo'q!"
 *       500:
 *         description: "Ichki server xatosi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
*/
router.post("/createAdminOrSuperAdmin", verifyTokenAndRole(['ADMIN']), createAdminOrSuperAdmin);

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get the authenticated user's profile
 *     description: Returns the profile details of the authenticated user.
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 fullname:
 *                   type: string
 *                   example: "John Doe"
 *                 email:
 *                   type: string
 *                   example: "johndoe@example.com"
 *                 phone:
 *                   type: string
 *                   example: "+998901234567"
 *       401:
 *         description: Unauthorized (Invalid token or no token provided)
 *       403:
 *         description: Forbidden (User does not have permission)
 *       500:
 *         description: Internal Server Error
 */
router.get("/me", verifyTokenAndRole(["USER", "ADMIN", "SUPERADMIN", "CEO"]), getMeProfile)

/**
 * @swagger
 * /users/me/update:
 *   patch:
 *     summary: "Foydalanuvchi profilini yangilash"
 *     description: "Foydalanuvchi o‘z profilini yangilaydi. Bearer Token talab qilinadi."
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: "Ali Valiyev"
 *               email:
 *                 type: string
 *                 example: "ali@example.com"
 *               password:
 *                 type: string
 *                 example: "newPassword123"
 *               photo:
 *                 type: string
 *                 example: "https://example.com/photo.jpg"
 *     responses:
 *       200:
 *         description: "Profil muvaffaqiyatli yangilandi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Profile successfully updated"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     fullName:
 *                       type: string
 *                       example: "Ali Valiyev"
 *                     email:
 *                       type: string
 *                       example: "ali@example.com"
 *                     photo:
 *                       type: string
 *                       example: "https://example.com/photo.jpg"
 *       400:
 *         description: "Yaroqsiz ma'lumotlar yuborildi"
 *       401:
 *         description: "Token yaroqsiz yoki yo'q"
 *       500:
 *         description: "Ichki server xatosi"
 */
router.patch("/me/update", verifyTokenAndRole(['USER', 'ADMIN', 'SUPERADMIN', 'CEO']), updateMyProfile)

/**
 * @swagger
 * /users/download-excel:
 *   get:
 *     summary: "Foydalanuvchilar ro‘yxatini Excel formatida yuklab olish"
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: "Excel fayl muvaffaqiyatli yuklab olindi"
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: "Foydalanuvchilar topilmadi"
 *       500:
 *         description: "Ichki server xatosi"
 */
router.get("/download-excel", verifyTokenAndRole(["ADMIN"]), downloadUsersExcel);

module.exports = router;

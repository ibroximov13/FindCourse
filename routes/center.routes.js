const express = require("express");
const router = express.Router();
const centerController = require("../controllers/center.controller");
const verifyTokenAndRole = require("../middlewares/verifyTokenAndRole");
const upload = require("../multer/center.multer");
/**
 * @swagger
 * /centers:
 *   post:
 *     summary: Creates a new center
 *     description: Adds a new center to the system with the provided details. Requires admin authorization.
 *     tags: 
 *       - Centers
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
 *               - regionId
 *               - address
 *               - phone
 *               - location
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the center
 *                 example: "Olmazor Center"
 *               regionId:
 *                 type: integer
 *                 description: The ID of the region where the center is located
 *                 example: 2
 *               adress:
 *                 type: string
 *                 description: The physical address of the center
 *                 example: "Olmazor tumani, 34-uy"
 *               phone:
 *                 type: string
 *                 description: Contact phone number for the center
 *                 example: "+998901234567"
 *               location:
 *                 type: string
 *                 description: Geographic coordinates of the center (latitude, longitude)
 *                 example: "41.311081, 69.240562"
 *               subjects:
 *                 type: array
 *                 description: List of subject IDs available at the center
 *                 items:
 *                   type: integer
 *                 example: [1, 2, 3]
 *               courses:
 *                 type: array
 *                 description: List of course IDs offered at the center
 *                 items:
 *                   type: integer
 *                 example: [4, 5]
 *     responses:
 *       201:
 *         description: Center successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Center created"
 *                 data:
 *                   type: object
 *                   description: The created center object
 *       400:
 *         description: Bad request due to invalid input or server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid input data"
 *       422:
 *         description: Validation error due to missing or incorrect fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "\"name\" is required"
 */
router.post("/", verifyTokenAndRole(["ADMIN"]), centerController.createCenter);

/**
 * @swagger
 * /centers:
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
 * /centers/{id}:
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
 * /centers/{id}:
 *   patch:
 *     summary: Partially update a center by ID
 *     description: Updates specific fields of an existing center. Only provided fields will be updated. Requires ADMIN or SUPERADMIN role.
 *     tags: 
 *       - Centers
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the center to update
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
 *                 description: The name of the center
 *                 example: "Olmazor Center"
 *               regionId:
 *                 type: integer
 *                 description: The ID of the region where the center is located
 *                 example: 2
 *               adress:
 *                 type: string
 *                 description: The physical address of the center
 *                 example: "Olmazor tumani, 34-uy"
 *               phone:
 *                 type: string
 *                 description: Contact phone number for the center
 *                 example: "+998998889977"
 *               location:
 *                 type: string
 *                 description: Geographic coordinates of the center (latitude, longitude)
 *                 example: "41.311081, 69.240562"
 *               subjects:
 *                 type: array
 *                 description: List of subject IDs available at the center
 *                 items:
 *                   type: integer
 *                 example: [1, 2, 3]
 *               courses:
 *                 type: array
 *                 description: List of course IDs offered at the center
 *                 items:
 *                   type: integer
 *                 example: [4, 5, 6]
 *             anyOf:
 *               - required: ["name"]
 *               - required: ["regionId"]
 *               - required: ["adress"]
 *               - required: ["phone"]
 *               - required: ["location"]
 *               - required: ["subjects"]
 *               - required: ["courses"]
 *     responses:
 *       200:
 *         description: Center partially updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 center:
 *                   type: object
 *                   description: The updated center object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Olmazor Center"
 *                     regionId:
 *                       type: integer
 *                       example: 2
 *                     adress:
 *                       type: string
 *                       example: "Olmazor tumani, 34-uy"
 *                     phone:
 *                       type: string
 *                       example: "+998998889977"
 *                     location:
 *                       type: string
 *                       example: "41.311081, 69.240562"
 *                     subjects:
 *                       type: array
 *                       items:
 *                         type: integer
 *                       example: [1, 2, 3]
 *                     courses:
 *                       type: array
 *                       items:
 *                         type: integer
 *                       example: [4, 5, 6]
 *       400:
 *         description: Bad request due to server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Something went wrong"
 *       404:
 *         description: Center not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Center not found"
 *       422:
 *         description: Validation error due to invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "\"phone\" must be a valid phone number"
 */
router.patch("/:id", verifyTokenAndRole(["ADMIN", "SUPERADMIN"]), centerController.patchCenter);

/**
 * @swagger
 * /centers/{id}:
 *   delete:
 *     summary: Delete a center by ID
 *     description: Deletes a center from the system based on the provided ID. Requires ADMIN role authorization.
 *     tags:
 *       - Centers
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the center to delete
 *         example: 1
 *     responses:
 *       200:
 *         description: Center successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Center deleted successfully"
 *       400:
 *         description: Bad request due to invalid ID or server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid ID format"
 *       403:
 *         description: Forbidden - User does not have required permissions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Forbidden: Insufficient permissions"
 *       404:
 *         description: Center not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Center not found"
 */
router.delete("/:id", verifyTokenAndRole(["ADMIN"]), centerController.deleteCenter);

/**
 * @swagger
 * /centers/upload-image:
 *   post:
 *     summary: Upload user image
 *     tags: [Centers]
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
router.post("/upload-image", upload.single("userImage"), centerController.uploadImage);

module.exports = router;
const { Router } = require("express");
const { createNewBranch, updateBranch, deleteBranch, getAllBranchs, getOneBranch, uploadImage } = require("../controllers/branch.controller");
const verifyTokenAndRole = require("../middlewares/verifyTokenAndRole");
const upload = require("../multer/user.multer");
const route = Router();

/**
 * @swagger
 * /branches:
 *   post:
 *     summary: Create a new branch
 *     description: Creates a new branch with the provided details. Requires admin access.
 *     tags: [Branches]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Main Branch"
 *               phone:
 *                 type: string
 *                 example: "+998901234567"
 *               location:
 *                 type: string
 *                 example: "123 Business Street"
 *               regionId:
 *                 type: integer
 *                 example: 1
 *               centerId:
 *                 type: integer
 *                 example: 1
 *               image:
 *                 type: string
 *                 example: "http://example.com/images/branch.jpg"
 *               subjectIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2, 3]
 *               courseIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [4, 5]
 *             required:
 *               - name
 *               - phone
 *               - location
 *               - regionId
 *               - centerId
 *     responses:
 *       201:
 *         description: Branch created successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               name: "Main Branch"
 *               phone: "+998901234567"
 *               location: "123 Business Street"
 *               regionId: 1
 *               centerId: 1
 *               image: "http://example.com/images/branch.jpg"
 *       400:
 *         description: Bad request - Validation error or duplicate branch
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - Insufficient permissions
 */
route.post("/", verifyTokenAndRole(["ADMIN"]), createNewBranch);

/**
 * @swagger
 * /branches/upload-image:
 *   post:
 *     summary: Upload branch image
 *     tags: [Branches]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               branchImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Insufficient permissions
 */
route.post("/upload-image", upload.single("branchImage"), verifyTokenAndRole(["ADMIN"]), uploadImage);

/**
 * @swagger
 * /branches/{id}:
 *   patch:
 *     summary: Update a branch
 *     tags: [Branches]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Branch ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Branch"
 *               phone:
 *                 type: string
 *                 example: "+998901234568"
 *               location:
 *                 type: string
 *               regionId:
 *                 type: integer
 *               centerId:
 *                 type: integer
 *               image:
 *                 type: string
 *               subjectIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *               courseIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       200:
 *         description: Branch updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Branch not found
 */
route.patch("/:id", verifyTokenAndRole(["ADMIN", "SUPERADMIN"]), updateBranch);

/**
 * @swagger
 * /branches/{id}:
 *   delete:
 *     summary: Delete a branch
 *     tags: [Branches]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Branch ID
 *     responses:
 *       200:
 *         description: Branch deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Branch not found
 */
route.delete("/:id", verifyTokenAndRole(["ADMIN"]), deleteBranch);

/**
 * @swagger
 * /branches:
 *   get:
 *     summary: Get all branches
 *     tags: [Branches]
 *     parameters:
 *       - in: query
 *         name: regionId
 *         schema:
 *           type: integer
 *         description: Filter branches by region ID
 *       - in: query
 *         name: centerId
 *         schema:
 *           type: integer
 *         description: Filter branches by center ID
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: take
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of branches per page
 *     responses:
 *       200:
 *         description: List of all branches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Branch'
 */
route.get("/", getAllBranchs);

/**
 * @swagger
 * /branches/{id}:
 *   get:
 *     summary: Get a specific branch
 *     tags: [Branches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Branch ID
 *     responses:
 *       200:
 *         description: Branch details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Branch'
 *       404:
 *         description: Branch not found
 */
route.get("/:id", getOneBranch);

module.exports = route;
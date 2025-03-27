const {Router} = require("express");
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
 *           example:
 *             name: "Main Branch"
 *             phone: "+998901234567"
 *             location: "123 Business Street"
 *             regionId: 1
 *             centerId: 1
 *             image: "http://example.com/images/branch.jpg"
 *             subjects: [1, 2, 3]
 *             courses: [4, 5]
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
 *         content:
 *           application/json:
 *             example:
 *               message: "Branch with the same name and location already exists"
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             example:
 *               message: "Authentication required"
 *       403:
 *         description: Forbidden - Insufficient permissions
 *         content:
 *           application/json:
 *             example:
 *               message: "Admin access required"
 */

route.post("/", verifyTokenAndRole(["ADMIN"]), createNewBranch);

/**
 * @swagger
 * /branches/upload-image:
 *   post:
 *     summary: Upload user image
 *     tags: [Branches]
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
 *         description: Image uploaded successfully.
 */
route.post("/upload-image", upload.single("branchImage"), verifyTokenAndRole(["ADMIN"]) , uploadImage);

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
 *           example:
 *             name: "Updated Branch"
 *             phone: "+998901234568"
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
 *       404:
 *         description: Branch not found
 */

route.get("/:id", getOneBranch);

module.exports = route;
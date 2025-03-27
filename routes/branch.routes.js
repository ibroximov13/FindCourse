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
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBranch'
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
 *             schema:
 *               $ref: '#/components/schemas/BranchResponse'
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

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateBranch:
 *       type: object
 *       required:
 *         - name
 *         - phone
 *         - location
 *         - regionId
 *         - centerId
 *         - subjects
 *         - courses
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *           maxLength: 100
 *           example: "Main Branch"
 *         phone:
 *           type: string
 *           pattern: ^\+[0-9]{11,12}$
 *           example: "+998901234567"
 *           description: Phone number in international format
 *         location:
 *           type: string
 *           minLength: 5
 *           maxLength: 200
 *           example: "123 Business Street"
 *         regionId:
 *           type: integer
 *           minimum: 1
 *           example: 1
 *         centerId:
 *           type: integer
 *           minimum: 1
 *           example: 1
 *         image:
 *           type: string
 *           format: uri
 *           maxLength: 500
 *           example: "http://example.com/images/branch.jpg"
 *           description: Optional URL of the branch image
 *         subjects:
 *           type: array
 *           minItems: 1
 *           items:
 *             type: integer
 *             minimum: 1
 *           example: [1, 2, 3]
 *           description: Array of subject IDs
 *         courses:
 *           type: array
 *           minItems: 1
 *           items:
 *             type: integer
 *             minimum: 1
 *           example: [4, 5]
 *           description: Array of course IDs
 *     BranchResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Main Branch"
 *         phone:
 *           type: string
 *           example: "+998901234567"
 *         location:
 *           type: string
 *           example: "123 Business Street"
 *         regionId:
 *           type: integer
 *           example: 1
 *         centerId:
 *           type: integer
 *           example: 1
 *         image:
 *           type: string
 *           format: uri
 *           nullable: true
 *           example: "http://example.com/images/branch.jpg"
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
 *       - bearerAuth: []
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
 *             $ref: '#/components/schemas/Branch'
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
 *       - bearerAuth: []
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
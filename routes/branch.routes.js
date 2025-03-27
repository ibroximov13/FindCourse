const {Router} = require("express");
const { createNewBranch, updateBranch, deleteBranch, getAllBranchs, getOneBranch, uploadImage } = require("../controllers/branch.controller");
const verifyTokenAndRole = require("../middlewares/verifyTokenAndRole");
const upload = require("../multer/user.multer");
const route = Router();

// Swagger documentation setup (typically in a separate file, but shown here for clarity)
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Branch:
 *       type: object
 *       required:
 *         - name
 *         - phone
 *         - location
 *         - regionId
 *         - centerId
 *       properties:
 *         name:
 *           type: string
 *           description: The branch name
 *         phone:
 *           type: string
 *           description: Branch phone number in +998XXXXXXXXX format
 *         location:
 *           type: string
 *           description: Branch location
 *         regionId:
 *           type: integer
 *           description: ID of the region
 *         centerId:
 *           type: integer
 *           description: ID of the center
 *       example:
 *         name: "Main Branch"
 *         phone: "+998901234567"
 *         location: "123 Business Street"
 *         regionId: 1
 *         centerId: 1
 */

/**
 * @swagger
 * /branches:
 *   post:
 *     summary: Create a new branch
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
 *             subjects: [1, 2, 3]  # Subject ID lar massivi
 *             courses: [4, 5]      # Course ID lar massivi
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
 *         description: Validation error or duplicate branch
 *         content:
 *           application/json:
 *             example:
 *               message: "There cannot be multiple branches with the same name in the same location."
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
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
 *           example: "http://example.com/images/branch.jpg"
 *           description: URL of the branch image (optional)
 *         subjects:
 *           type: array
 *           items:
 *             type: integer
 *           example: [1, 2, 3]
 *           description: Array of subject IDs to associate with the branch
 *         courses:
 *           type: array
 *           items:
 *             type: integer
 *           example: [4, 5]
 *           description: Array of course IDs to associate with the branch
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
 *           nullable: true
 *           example: "http://example.com/images/branch.jpg"
 */
route.post("/", upload.single(), verifyTokenAndRole(["ADMIN"]), createNewBranch);

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
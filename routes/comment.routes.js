const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment.controller");
const validate = require("../middlewares");
const { commentCreateSchema, commentUpdateSchema } = require("../validation/comment.validate");

router.post("/", validate(commentCreateSchema), commentController.createComment);
router.get("/", commentController.getAllComments);
router.get("/:id", commentController.getCommentById);
router.put("/:id", validate(commentUpdateSchema), commentController.updateComment);
router.patch("/:id", validate(commentUpdateSchema), commentController.patchComment);
router.delete("/:id", commentController.deleteComment);

module.exports = router;
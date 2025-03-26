const express = require("express");
const router = express.Router();
const likeController = require("../controllers/like.controller");

router.post("/", likeController.createLike);

router.get("/", likeController.getAllLikes);

router.get("/:id", likeController.getLikeById);

router.put("/:id", likeController.updateLike);

router.patch("/:id", likeController.patchLike);

router.delete("/:id", likeController.deleteLike);

module.exports = router;
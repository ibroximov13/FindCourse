const Like = require("../models/like.model");
const { Op } = require("sequelize");
const { createLikeSchema, updateLikeSchema } = require("../validation/like.validate");
const logger = require("../config/log").child({model: "like"})

const createLike = async (req, res) => {
  try {
    const { error } = createLikeSchema.validate(req.body);
    if (error) {
      logger.warn(`like validation error: ${error.details[0].message}`);
      return res.status(400).json({ error: error.details[0].message });
    }

    const like = await Like.create(req.body);
    logger.info(`like create with ID: ${like.id}`);
    res.status(201).json({ message: "like create successfully", data: like });
  } catch (error) {
    logger.error(`createlike error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const getAllLikes = async (req, res) => {
  try {
    const { userId, centerId, page = 1, limit = 10, order = "DESC" } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (userId) where.userId = userId;
    if (centerId) where.centerId = centerId;

    const likes = await Like.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["id", order.toUpperCase() === "ASC" ? "ASC" : "DESC"]],
    });

    logger.info(`Fetched ${likes.rows.length} likes (Page: ${page})`);
    res.json({
      total: likes.count,
      totalPages: Math.ceil(likes.count / limit),
      currentPage: parseInt(page),
      data: likes.rows,
    });
  } catch (error) {
    logger.error(`getAllLikes error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const getLikeById = async (req, res) => {
  try {
    const like = await Like.findByPk(req.params.id);
    if (!like) {
      logger.warn(`like not found with ID: ${req.params.id}`);
      return res.status(404).json({ message: "Like not found" });
    }
    logger.info(`fetch like with ID: ${req.params.id}`);
    res.json(like);
  } catch (error) {
    logger.error(`getLikeById error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const updateLike = async (req, res) => {
  try {
    const like = await Like.findByPk(req.params.id);
    if (!like) {
      logger.warn(`like not found for update with ID: ${req.params.id}`);
      return res.status(404).json({ message: "like not found" });
    }

    const { error } = updateLikeSchema.validate(req.body);
    if (error) {
      logger.warn(`like update validation error: ${error.details[0].message}`);
      return res.status(400).json({ error: error.details[0].message });
    }

    await like.update(req.body);
    logger.info(`like updated with ID: ${req.params.id}`);
    res.json({ message: "like update successfully", data: like });
  } catch (error) {
    logger.error(`updateLike error: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
};

const patchLike = async (req, res) => {
  try {
    const like = await Like.findByPk(req.params.id);
    if (!like) {
      logger.warn(`like not found for patch with ID: ${req.params.id}`);
      return res.status(404).json({ message: "like not found" });
    }

    await like.update(req.body);
    logger.info(`like partially update with ID: ${req.params.id}`);
    res.json({ message: "like partially updated", data: like });
  } catch (error) {
    logger.error(`patchLike error: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
};

const deleteLike = async (req, res) => {
  try {
    const like = await Like.findByPk(req.params.id);
    if (!like) {
      logger.warn(`like not found for delete with ID: ${req.params.id}`);
      return res.status(404).json({ message: "like not found" });
    }

    await like.destroy();
    logger.info(`like delete with ID: ${req.params.id}`);
    res.json({ message: "like delete successfully" });
  } catch (error) {
    logger.error(`deleteLike error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createLike,
  getAllLikes,
  getLikeById,
  updateLike,
  patchLike,
  deleteLike,
};
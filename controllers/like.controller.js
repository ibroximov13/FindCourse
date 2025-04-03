const Like = require("../models/like.model");
const { Op } = require("sequelize");
const { createLikeSchema } = require("../validation/like.validate");
const logger = require("../config/log").child({ model: "like" });

const createLike = async (req, res) => {
  try {
    const { error, value } = createLikeSchema.validate(req.body);
    if (error) {
      logger.warn(`like validation error: ${error.details[0].message}`);
      return res.status(400).json({ error: error.details[0].message });
    };

    let userId = req.user.id;
    let { centerId } = value;

    const existingLike = await Like.findOne({
      where: {
        userId,
        centerId
      }
    });

    if (existingLike) {
      logger.warn(`User ${userId} already liked center ${centerId}`);
      return res.status(400).json({ error: "You have already liked this center" });
    }

    const like = await Like.create({ centerId, userId: userId });
    logger.info(`like created with ID: ${like.id}`);
    res.status(201).json({ message: "like created successfully", data: like });
  } catch (error) {
    logger.error(`createLike error: ${error.message}`);
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
      order: [["centerId", order.toUpperCase() === "ASC" ? "ASC" : "DESC"]],
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

const deleteLike = async (req, res) => {
  try {
    const like = await Like.findByPk(req.params.id);
    if (!like) {
      logger.warn(`like not found for delete with ID: ${req.params.id}`);
      return res.status(404).json({ message: "like not found" });
    }

    await like.destroy();
    logger.info(`like deleted with ID: ${req.params.id}`);
    res.json({ message: "like deleted successfully" });
  } catch (error) {
    logger.error(`deleteLike error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createLike,
  getAllLikes,
  deleteLike,
};
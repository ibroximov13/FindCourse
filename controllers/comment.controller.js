const { Op } = require("sequelize");
const { Comment } = require("../model");
const { CommentValidationCreate, CommentValidationUpdate } = require("../validation/comment.validate");
const logger = require("../config/log").child({model: "comment"})

const createComment = async (req, res) => {
  try {
    const { error, value } = CommentValidationCreate.validate(req.body);
    if (error) {
      logger.error(`Validation error on createComment: ${error.details[0].message}`);
      return res.status(400).json({ message: error.details[0].message });
    }

    const comment = await Comment.create(value);
    logger.info(`Comment created with ID: ${comment.id}`);
    res.status(201).json({ message: "comment created successfully", data: comment });
  } catch (error) {
    logger.error(`createComment error: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
};

const getAllComments = async (req, res) => {
  try {
    const {
      userId,
      centerId,
      star,
      page = 1,
      limit = 10,
      order = "DESC",
      messageSearch,
    } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (userId) where.user_id = userId;
    if (centerId) where.center_id = centerId;
    if (star) where.star = star;
    if (messageSearch) {
      where.message = { [Op.iLike]: `%${messageSearch}%` };
    }

    const comments = await Comment.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["id", order.toUpperCase() === "ASC" ? "ASC" : "DESC"]],
    });

    logger.info(`Fetched ${comments.rows.length} comments`);
    res.json({
      total: comments.count,
      totalPages: Math.ceil(comments.count / limit),
      currentPage: parseInt(page),
      data: comments.rows,
    });
  } catch (error) {
    logger.error(`getAllComments error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) {
      logger.warn(`Comment not found with ID: ${req.params.id}`);
      return res.status(404).json({ message: "comment not found" });
    }
    logger.info(`Fetched comment with ID: ${req.params.id}`);
    res.json(comment);
  } catch (error) {
    logger.error(`getCommentById error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const updateComment = async (req, res) => {
  try {
    const { error, value } = CommentValidationUpdate.validate(req.body);
    if (error) {
      logger.error(`Validation error on updateComment: ${error.details[0].message}`);
      return res.status(400).json({ message: error.details[0].message });
    }

    const comment = await Comment.findByPk(req.params.id);
    if (!comment) {
      logger.warn(`Comment not found for update with ID: ${req.params.id}`);
      return res.status(404).json({ message: "comment not found" });
    }

    await comment.update(value);
    logger.info(`Comment updated with ID: ${req.params.id}`);
    res.json({ message: "comment fully updated", data: comment });
  } catch (error) {
    logger.error(`updateComment error: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
};

const patchComment = async (req, res) => {
  try {
    const { error, value } = CommentValidationUpdate.validate(req.body);
    if (error) {
      logger.error(`Validation error on patchComment: ${error.details[0].message}`);
      return res.status(400).json({ message: error.details[0].message });
    }

    const comment = await Comment.findByPk(req.params.id);
    if (!comment) {
      logger.warn(`Comment not found for patch with ID: ${req.params.id}`);
      return res.status(404).json({ message: "comment not found" });
    }

    await comment.update(value);
    logger.info(`Comment partially updated with ID: ${req.params.id}`);
    res.json({ message: "comment partially updated", data: comment });
  } catch (error) {
    logger.error(`patchComment error: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) {
      logger.warn(`Comment not found for delete with ID: ${req.params.id}`);
      return res.status(404).json({ message: "comment not found" });
    }

    await comment.destroy();
    logger.info(`Comment deleted with ID: ${req.params.id}`);
    res.json({ message: "comment deleted successfully" });
  } catch (error) {
    logger.error(`deleteComment error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createComment,
  getAllComments,
  getCommentById,
  updateComment,
  patchComment,
  deleteComment,
};
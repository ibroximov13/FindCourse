const Center = require("../models/center.model");
const { Op } = require("sequelize");
const logger = require("../config/log").child({model: "center"})

const createCenter = async (req, res) => {
  try {
    const center = await Center.create(req.body);
    logger.info(`Center created with ID: ${center.id}`);
    res.status(201).json({ message: "Center created", data: center });
  } catch (error) {
    logger.error(`createCenter error: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
};

const getAllCenters = async (req, res) => {
  try {
    const { name, regionId, page = 1, limit = 10, order = "DESC" } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (name) where.name = { [Op.iLike]: `%${name}%` };
    if (regionId) where.regionId = regionId;

    const centers = await Center.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["id", order.toUpperCase() === "ASC" ? "ASC" : "DESC"]],
    });

    logger.info(`Fetched ${centers.rows.length} centers (Page: ${page})`);
    res.json({
      total: centers.count,
      totalPages: Math.ceil(centers.count / limit),
      currentPage: parseInt(page),
      data: centers.rows,
    });
  } catch (error) {
    logger.error(`getAllCenters error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const getCenterById = async (req, res) => {
  try {
    const center = await Center.findByPk(req.params.id);
    if (!center) {
      logger.warn(`Center not found with ID: ${req.params.id}`);
      return res.status(404).json({ message: "Center not found" });
    }
    logger.info(`Fetched center with ID: ${req.params.id}`);
    res.json(center);
  } catch (error) {
    logger.error(`getCenterById error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const updateCenter = async (req, res) => {
  try {
    const center = await Center.findByPk(req.params.id);
    if (!center) {
      logger.warn(`Center not found for update with ID: ${req.params.id}`);
      return res.status(404).json({ message: "Center not found" });
    }

    await center.update(req.body);
    logger.info(`Center fully updated with ID: ${req.params.id}`);
    res.json({ message: "Center fully updated", data: center });
  } catch (error) {
    logger.error(`updateCenter error: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
};

const patchCenter = async (req, res) => {
  try {
    const center = await Center.findByPk(req.params.id);
    if (!center) {
      logger.warn(`Center not found for patch with ID: ${req.params.id}`);
      return res.status(404).json({ message: "Center not found" });
    }

    await center.update(req.body);
    logger.info(`Center partially updated with ID: ${req.params.id}`);
    res.json({ message: "Center partially updated", data: center });
  } catch (error) {
    logger.error(`patchCenter error: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
};

const deleteCenter = async (req, res) => {
  try {
    const center = await Center.findByPk(req.params.id);
    if (!center) {
      logger.warn(`Center not found for delete with ID: ${req.params.id}`);
      return res.status(404).json({ message: "Center not found" });
    }

    await center.destroy();
    logger.info(`Center deleted with ID: ${req.params.id}`);
    res.json({ message: "Center deleted successfully" });
  } catch (error) {
    logger.error(`deleteCenter error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCenter,
  getAllCenters,
  getCenterById,
  updateCenter,
  patchCenter,
  deleteCenter,
};
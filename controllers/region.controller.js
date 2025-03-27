const Region = require("../models/region.model");
const { Op } = require("sequelize");
const { createRegionSchema, updateRegionSchema } = require("../validation/region.validate");
const logger = require("../config/log").child({model: "region"})


const createRegion = async (req, res) => {
  try {
    const { error, value } = createRegionSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    let { name } = value;

    const region = await Region.findOne({
      where: {
        name: name,
      }
    });

    if (region) {
      return res.status(400).send({message: "Region already exists"});
    }

    let newRegion = await Region.create({
      name: name
    });

    logger.info(`region create: ${newRegion.id}`);
    res.status(201).json({data: newRegion });
  } catch (err) {
    logger.error(`error creating region: ${err.message}`);
    res.status(400).json({ error: err.message });
  }
};

const getAllRegions = async (req, res) => {
  try {
    const { name, page = 1, limit = 15, order = "ASC" } = req.query;
    const offset = (page - 1) * limit;

    if (!page || isNaN(page) || page <= 0) {
      return res.status(400).json({ error: "Page must be a positive integer" });
    }
    if (!limit || isNaN(limit) || limit <= 0) {
      return res.status(400).json({ error: "Limit must be a positive integer" });
    }

    const where = {};
    if (name) where.name = { [Op.like]: `%${name}%` };

    const regions = await Region.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["id", order.toUpperCase() === "DESC" ? "DESC" : "ASC"]],
    });

    res.json({
      total: regions.count,
      totalPages: Math.ceil(regions.count / limit),
      currentPage: parseInt(page),
      data: regions.rows,
    })
  } catch (err) {
    logger.error(`Error fetching regions: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};

const getRegionById = async (req, res) => {
  try {
    const region = await Region.findByPk(req.params.id);
    if (!region) return res.status(404).json({ message: "region not found" });

    res.json(region);
  } catch (err) {
    logger.error(`error fetching region by ID: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};

const updateRegion = async (req, res) => {
  try {
    const { error } = updateRegionSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const region = await Region.findByPk(req.params.id);
    if (!region) return res.status(404).json({ message: "region not found" });

    await region.update(req.body);
    logger.info(`region fully update: ${region.id}`);
    res.json({ message: "region fully updated", data: region });
  } catch (err) {
    logger.error(`error updating region: ${err.message}`);
    res.status(400).json({ error: err.message });
  }
};

const patchRegion = async (req, res) => {
  try {
    const { error } = updateRegionSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const region = await Region.findByPk(req.params.id);
    if (!region) return res.status(404).json({ message: "region not found" });

    await region.update(req.body);
    logger.info(`region partially updated: ${region.id}`);
    res.json({ message: "region partially updated", data: region });
  } catch (err) {
    logger.error(`error patching region: ${err.message}`);
    res.status(400).json({ error: err.message });
  }
};

const deleteRegion = async (req, res) => {
  try {
    const region = await Region.findByPk(req.params.id);
    if (!region) return res.status(404).json({ message: "region not found" });

    await region.destroy();
    logger.info(`region delete: ${region.id}`);
    res.json({ message: "region delete successfully" });
  } catch (err) {
    logger.error(`error deleting region: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createRegion,
  getAllRegions,
  getRegionById,
  updateRegion,
  patchRegion,
  deleteRegion,
};

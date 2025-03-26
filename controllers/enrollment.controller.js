const Enrollment = require("../models/enrollment.model");
const { createEnrollmentSchema, updateEnrollmentSchema } = require("../validation/enrollment.validate");
const logger = require("../config/log").child({ model: "enrollment" });

const createEnrollment = async (req, res) => {
  try {
    const { error } = createEnrollmentSchema.validate(req.body);
    if (error) {
      logger.warn(`validation error: ${error.details[0].message}`);
      return res.status(400).json({ error: error.details[0].message });
    }

    const enrollment = await Enrollment.create(req.body);
    logger.info(`enrollment create with ID: ${enrollment.id}`);
    res.status(201).json({ message: "enrollment create successfully", data: enrollment });
  } catch (error) {
    logger.error(`createEnrollment error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const getAllEnrollments = async (req, res) => {
  try {
    const { userId, centerId, page = 1, limit = 10, order = "DESC" } = req.query;
    const offset = (page - 1) * limit;
    const where = {};
    if (userId) where.userId = userId;
    if (centerId) where.centerId = centerId;

    const enrollments = await Enrollment.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["id", order.toUpperCase() === "ASC" ? "ASC" : "DESC"]],
    });

    logger.info(`Fetched ${enrollments.rows.length} enrollments on page ${page}`);
    res.json({
      total: enrollments.count,
      totalPages: Math.ceil(enrollments.count / limit),
      currentPage: parseInt(page),
      data: enrollments.rows,
    });
  } catch (error) {
    logger.error(`getAllEnrollments error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const getEnrollmentById = async (req, res) => {
  try {
    const enrollment = await Enrollment.findByPk(req.params.id);
    if (!enrollment) {
      logger.warn(`enrolment not found with ID: ${req.params.id}`);
      return res.status(404).json({ message: "enrollment not found" });
    }
    logger.info(`fetch enrollment with ID: ${req.params.id}`);
    res.json(enrollment);
  } catch (error) {
    logger.error(`getEnrollmentById error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const updateEnrollment = async (req, res) => {
  try {
    const { error } = updateEnrollmentSchema.validate(req.body);
    if (error) {
      logger.warn(`update validation error: ${error.details[0].message}`);
      return res.status(400).json({ error: error.details[0].message });
    }

    const enrollment = await Enrollment.findByPk(req.params.id);
    if (!enrollment) {
      logger.warn(`enrollment not found with ID: ${req.params.id}`);
      return res.status(404).json({ message: "enrollment not found" });
    }

    await enrollment.update(req.body);
    logger.info(`enrollment update with ID: ${req.params.id}`);
    res.json({ message: "enrollment update successfully", data: enrollment });
  } catch (error) {
    logger.error(`updateEnrollment error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const patchEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findByPk(req.params.id);
    if (!enrollment) {
      logger.warn(`enrollment not found with ID: ${req.params.id}`);
      return res.status(404).json({ message: "enrollment not found" });
    }

    await enrollment.update(req.body);
    logger.info(`enrollment partially updated with ID: ${req.params.id}`);
    res.json({ message: "enrollment partially updated", data: enrollment });
  } catch (error) {
    logger.error(`patchEnrollment error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const deleteEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findByPk(req.params.id);
    if (!enrollment) {
      logger.warn(`enrollment not found with ID: ${req.params.id}`);
      return res.status(404).json({ message: "enrollment not found" });
    }

    await enrollment.destroy();
    logger.info(`enrollment deleted with ID: ${req.params.id}`);
    res.json({ message: "enrollment delete successfully" });
  } catch (error) {
    logger.error(`deleteEnrollment error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createEnrollment,
  getAllEnrollments,
  getEnrollmentById,
  updateEnrollment,
  patchEnrollment,
  deleteEnrollment,
};
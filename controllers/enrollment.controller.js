const Enrollment = require("../models/enrollment.model");
const Month = require("../models/month.model");
const { createEnrollmentSchema } = require("../validation/enrollment.validate");
const logger = require("../config/log").child({ model: "enrollment" });

const fullData = require("../utils/fullData");

const createEnrollment = async (req, res) => {
  try {
    const userId = req.user.id; 
    
    
    const { error, value } = createEnrollmentSchema.validate(req.body);
    if (error) {
      logger.warn(`validation error: ${error.details[0].message}`);
      return res.status(400).json({ error: error.details[0].message });
    }
    const enrollmentData = {
      userId: userId,
      centerId: value.centerId,
      courseId: value.courseId,
      subjectId: value.subjectId,
      monthId: value.monthId
    }

    const enrollment = await Enrollment.create(enrollmentData);
    logger.info(`enrollment created with ID: ${enrollment.id}`);
    res.status(201).json({ 
      message: "enrollment created successfully", 
      data: enrollment 
    });
  } catch (error) {
    logger.error(`createEnrollment error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const getAllEnrollments = async (req, res) => {
  try {
    const { centerId, page = 1, limit = 10, order = "DESC" } = req.query;
    const offset = (page - 1) * limit;
    const where = {};
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
      logger.warn(`enrollment not found with ID: ${req.params.id}`);
      return res.status(404).json({ message: "enrollment not found" });
    }
    logger.info(`fetched enrollment with ID: ${req.params.id}`);
    res.json(enrollment);
  } catch (error) {
    logger.error(`getEnrollmentById error: ${error.message}`);
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
    res.json({ message: "enrollment deleted successfully" });
  } catch (error) {
    logger.error(`deleteEnrollment error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const getAllMonths = async (req, res) => {
  try {
    const { page = 1, limit = 10, order = "DESC" } = req.query; // Pagination va sort parametrlari
    const offset = (page - 1) * limit;

    const months = await Month.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["id", order.toUpperCase() === "ASC" ? "ASC" : "DESC"]], // ID bo‘yicha tartiblash
    });

    logger.info(`Fetched ${months.rows.length} months on page ${page}`);
    res.json({
      total: months.count,
      totalPages: Math.ceil(months.count / limit),
      currentPage: parseInt(page),
      data: months.rows,
    });
  } catch (error) {
    logger.error(`getAllMonths error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createEnrollment,
  getAllEnrollments,
  getEnrollmentById,
  deleteEnrollment,
  getAllMonths
};
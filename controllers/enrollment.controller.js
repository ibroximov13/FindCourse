const { createEnrollmentSchema } = require("../validation/enrollment.validate");
const logger = require("../config/log").child({ model: "enrollment" });

const fullData = require("../utils/fullData");
const { Center, Course, User, Subject, Enrollment, Month } = require("../models");

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
    let page = parseInt(req.query.page) || 1;
        let take = parseInt(req.query.take) || 10;
        let offset = (page - 1) * take;

        let order = req.query.order === "DESC" ? "DESC" : "ASC";
        let allowedColumns = ["id", "userId", "courseId", "subjectId", "centerId", "date"];
        let column = allowedColumns.includes(req.query.column) ? req.query.column : "id";

    const enrollments = await Enrollment.findAll({
      include: [
        {
            model: Center,
            attributes: ["name"],
        },
        {
            model: Course,
            attributes: ["id", "name", "phone", "location"]
        },
        {
            model: User, 
            through: { attributes: [] } 
        },
        {
            model: Subject , 
            through: { attributes: [] } 
        },
    ],
    // group: ["Branch.id", "region.id", "center.id"], 
    subQuery: false,
    limit: take,
    offset: offset,
    order: [[column, order]]
    });

    logger.info(`Fetched ${enrollments.rows.length} enrollments on page ${page}`);
    req.status(201).send(enrollments);
  } catch (error) {
    logger.error(`getAllEnrollments error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const getEnrollmentById = async (req, res) => {
  try {
    const enrollment = await Enrollment.findByPk(req.params.id, {
  //   include: [
  //     {
  //         model: Center,
  //         attributes: ["name"],
  //     },
  //     {
  //         model: Course,
  //         attributes: ["id", "name", "phone", "location"]
  //     },
  //     {
  //         model: User, 
  //         through: { attributes: [] } 
  //     },
  //     {
  //         model: Subject, 
  //         through: { attributes: [] } 
  //     },
  // ],
  });
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
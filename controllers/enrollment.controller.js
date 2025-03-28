const { Op } = require("sequelize");
const { Center, Course, User, Subject, Enrollment } = require("../models");
const { createEnrollmentSchema, updateEnrollmentSchema } = require("../validation/enrollment.validate");
const logger = require("../config/log").child({ model: "enrollment" });

const createEnrollment = async (req, res) => {
  try {
    const { error, value } = createEnrollmentSchema.validate(req.body);
    if (error) {
      logger.warn(`validation error: ${error.details[0].message}`);
      return res.status(400).json({ error: error.details[0].message });
    }

    let userId = req.user.id;
    let {courseId, centerId, subjectId, date} = value;

    const enrollment = await Enrollment.create({
      subjectId,
      courseId, 
      centerId, 
      userId: userId,
      date
    });
    logger.info(`enrollment create with ID: ${enrollment.id}`);
    res.status(201).json({ enrollment });
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
            model: Subject, 
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

const patchEnrollment = async (req, res) => {
  try {
    const { error, value } = updateEnrollmentSchema.validate(req.body);
    if (error) {
      logger.warn(`update validation error: ${error.details[0].message}`);
      return res.status(400).json({ error: error.details[0].message });
    }

    const enrollment = await Enrollment.findByPk(req.params.id);
    if (!enrollment) {
      logger.warn(`enrollment not found with ID: ${req.params.id}`);
      return res.status(404).json({ message: "enrollment not found" });
    }

    await enrollment.update(value);
    logger.info(`enrollment update with ID: ${req.params.id}`);
    res.json({ message: "enrollment update successfully", data: enrollment });
  } catch (error) {
    logger.error(`updateEnrollment error: ${error.message}`);
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
  patchEnrollment,
  deleteEnrollment,
};
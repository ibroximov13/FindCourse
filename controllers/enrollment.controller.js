const { createEnrollmentSchema } = require("../validation/enrollment.validate");
const logger = require("../config/log").child({ model: "enrollment" });
const { Center, Course, User, Subject, Enrollment } = require("../models");

const createEnrollment = async (req, res) => {
  try {
    const userId = req.user.id;

    const { error, value } = createEnrollmentSchema.validate(req.body);
    if (error) {
      logger.warn(`validation error: ${error.details[0].message}`);
      // Agar courseId va subjectId ikkalasi ham yo'q bo'lsa, maxsus xabar qaytarish
      if (error.details[0].type === 'object.missing') {
        return res.status(400).json({ error: 'At least one of courseId or subjectId must be provided' });
      }
      return res.status(400).json({ error: error.details[0].message });
    }

    const enrollmentData = {
      userId: userId,
      centerId: value.centerId,
      courseId: value.courseId || null,
      subjectId: value.subjectId || null,
    };

    const enrollment = await Enrollment.create(enrollmentData);
    logger.info(`enrollment created with ID: ${enrollment.id}`);
    res.status(201).json({
      data: enrollment,
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
    let allowedColumns = ["id", "userId", "courseId", "subjectId", "centerId", "createdAt"];
    let column = allowedColumns.includes(req.query.column) ? req.query.column : "id";

    const enrollments = await Enrollment.findAll({
      include: [
        {
          model: Center,
          attributes: ["name"],
        },
        {
          model: Course,
          attributes: ["id", "name"],
        },
        {
          model: User,
          attributes: ["id", "fullName"],
        },
        {
          model: Subject,
          attributes: ["id", "name"],
        },
      ],
      limit: take,
      offset: offset,
      order: [[column, order]],
    });

    logger.info(`Fetched ${enrollments.length} enrollments on page ${page}`);
    res.status(200).send(enrollments);
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

module.exports = {
  createEnrollment,
  getAllEnrollments,
  getEnrollmentById,
  deleteEnrollment,
};
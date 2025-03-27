const { SubjectItem, CourseItem, Branch, Subject, Course, User, Like, Center, Region } = require("../models");
const { Op } = require("sequelize");
const { createCenterValidation } = require("../validation/center.validate");
const logger = require("../config/log").child({model: "center"})

const createCenter = async (req, res) => {
  try {
    const {error, value} = createCenterValidation.validate(req.body);
    if (error) {
      return res.status(422).send(error.details[0].message);
    }
    let {subjects, courses, ...rest} = value;
    const center = await Center.create({...rest});
    let centerId = center.id;
    let a = subjects.map((r) => {
      return {
        centerId: centerId,
        subjectId: r
      }
    });
    
    await SubjectItem.bulkCreate(a);

    let b = courses.map((r) => {
      return {
        centerId: centerId,
        courseId: r
      }
    });

    await CourseItem.bulkCreate(b);
    
    logger.info(`Center created with ID: ${center.id}`);
    res.status(201).json({ message: "Center created", data: center });
  } catch (error) {
    logger.error(`createCenter error: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
};

const getAllCenters = async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let take = parseInt(req.query.take) || 10;
    let offset = (page - 1) * take;

    let filter = req.query.filter || "";
    let order = req.query.order === "DESC" ? "DESC" : "ASC";
    let allowedColumns = ["id", "name", "phone", "location", "regionId", "centerId"];
    let column = allowedColumns.includes(req.query.column) ? req.query.column : "id";

    let centers = await Center.findAll({
      include: [
        {
          model: Branch,
        },
        {
          model: Region
        }
      ],
      subQuery: false,
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${filter}%` } },
          { phone: { [Op.like]: `%${filter}%` } },
          { location: { [Op.like]: `%${filter}%` } },
        ],
      },
      limit: take,
      offset: offset,
      order: [[column, order]],
    });

    logger.info(`Get all centers`);
    res.status(200).send(centers);
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

const uploadImage = async (req, res) => {
  try {
      if (!req.file) {
          return res.status(400).json({ error: "Rasm yuklanishi kerak" });
      }
      const imageUrl = `${req.protocol}://${req.get("host")}/image/${req.file.filename}`;
      res.status(200).json({ url: imageUrl });
  } catch (error) {
      res.status(500).json({ error: "Serverda xatolik yuz berdi" });
  }
};

module.exports = {
  createCenter,
  getAllCenters,
  getCenterById,
  patchCenter,
  deleteCenter,
  uploadImage
};
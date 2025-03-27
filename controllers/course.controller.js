const { Course, BranchCourseItem, Branch, CourseItem, Center } = require("../models");
const { createCourseValidate, courseByIdValidate, updateCourseValidate } = require("../validation/course.validate");

const logger = require("../config/log").child({ model: "Cource" });

const createCourse = async (req, res) => {
    try {
        let { error, value } = createCourseValidate(req.body);
        if (error) {
            return res.status(422).send(error.details[0].message);
        };

        let { name, image } = value;
        let course = await Course.findOne({ where: { name } });
        if (course) {
            return res.status(400).send("Course already exists");
        };

        let newCourse = await Course.create({
            name, image
        });

        res.status(201).send(newCourse);
    } catch (error) {
        logger.error(error.message)
        console.log(error.message);
    }
};

const updateCourse = async (req, res) => {
    try {
        let { error: errorId, value: valueId } = courseByIdValidate(req.params);
        if (errorId) {
            return res.status(422).send(errorId.details[0].message);
        };

        let id = valueId.id
        let { error, value } = updateCourseValidate(req.body);
        if (error) {
            return res.status(422).send(error.details[0].message);
        };
        let { name, image } = value;
        let course = await Course.findOne({ where: { id: id, name: name } });
        if (!course) {
            return res.status(400).send("Course already exists");
        };

        let updatedCourse = await Course.update({
            name: name || course.name,
            image: image || course.image
        });

        logger.info("Course updated");
        res.status(200).send(updatedCourse);
    } catch (error) {
        logger.error(error.message)
        console.log(error.message);
    };
};



const deleteCourse = async (req, res) => {
    try {
        let { error, value } = courseByIdValidate(req.params);
        if (error) {
            return res.status(422).send(error.details[0].message)
        };

        let id = value.id;
        let course = await Course.findOne({
            where: { id }
        });

        if (!course) {
            return res.status(404).send("Course not found");
        };

        let deletedCourse = await course.destroy();
        logger.info(`Deleted Course - id: ${id}`);
        res.status(200).send(deletedCourse)
    } catch (error) {
        logger.error(error.message);
        console.log(error.message);
    };
};

const getAllCourse = async (req, res) => {
    try {
        let page = parseInt(req.query.page) || 1;
        let take = parseInt(req.query.take) || 10;
        let offset = (page - 1) * take;

        let filter = req.query.filter || "";
        let order = req.query.order === "DESC" ? "DESC" : "ASC";
        let allowedColumns = ["id", "name", "phone", "location", "regionId", "centerId"];
        let column = allowedColumns.includes(req.query.column) ? req.query.column : "id";

        const course = await Course.findAll({
            where: {
                name: {
                    [Op.like]: `%${filter}%`
                }
            },
            include: [
                {
                    model: Branch,
                    attributes: ["id", "phone", "location"] 
                },
                {
                    model: Center,
                    attributes: ["id", "name", "adress", "location", "star"]
                }
            ],
            limit: take,
            offset: offset,
            order: [[column, order]]
        });
        logger.info("GetAllCourse");
        res.status(200).send(course);
    } catch (error) {
        logger.error(error.message);
        console.log(error.message);
    }
};

const getOneCourse = async (req, res) => {
    try {
        let { error, value } = courseByIdValidate(req.params);
        if (error) {
            return res.status(422).send(error.details[0].message);
        }

        let id = value.id;

        let course = await Course.findOne({
            where: {
                id: id,
            },
            include: [
                {
                    model: Branch,
                    attributes: ["id", "phone", "location"] 
                },
                {
                    model: Center,
                    attributes: ["id", "name", "adress", "location", "star"]
                }
            ],
        })

        logger.info("GetOneCourse");
        res.status(200).send(course);
    } catch (error) {
        logger.error(error.message);
        console.log(error.message);
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
    createCourse,
    updateCourse,
    deleteCourse,
    getAllCourse,
    getOneCourse,
    uploadImage
};
const { Op } = require("sequelize");
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
        }

        let id = valueId.id;
        let { error, value } = updateCourseValidate(req.body);
        if (error) {
            return res.status(422).send(error.details[0].message);
        }
        let { name, image } = value;
        let course = await Course.findByPk(id);
        if (!course) {  
            return res.status(400).send("Course not found");
        }

        await Course.update(
            {
                name: name || course.name,
                image: image || course.image
            },
            {
                where: { id: id }  
            }
        );

        logger.info("Course updated");
        res.status(200).send({ message: "Subject updated successfully" });
    } catch (error) {
        logger.error(error.message);
        res.status(500).send("Internal Server Error");
    }
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
        let limit = parseInt(req.query.limit) || 10;
        let offset = (page - 1) * limit;

        let filter = req.query.filter || "";
        let order = req.query.order === "DESC" ? "DESC" : "ASC";
        let allowedColumns = ["id", "name"];
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
                    attributes: ["id", "name", "adress", "location"]
                }
            ],
            limit: limit,
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
            where: { id: id },
            include: [
                {
                    model: Branch,
                    attributes: ["id", "phone", "location"]
                },
                {
                    model: Center,
                    attributes: ["id", "name", "adress", "location"]
                }
            ],
        });

        if (!course) {
            return res.status(404).send({ message: "Course not found" });
        }

        logger.info("GetOneCourse");
        res.status(200).send(course);
    } catch (error) {
        logger.error(error.message);
        res.status(500).send({ message: "Internal Server Error" });
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
const { Course } = require("../models");
const { createCourseValidate, courseByIdValidate, updateCourseValidate } = require("../validation/course.validate");

const logger = require("../config/log").child({model: "Cource"});

const createCourse = async (req, res) => {
    try {
        let {error, value} = createCourseValidate(req.body);
        if (error) {
            return res.status(422).send(error.details[0].message);
        };

        let {name, image} = value;
        let course = await Course.findOne({where: {name}});
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
        let {error: errorId, value: valueId} = courseByIdValidate(req.params);
        if (errorId) {
            return res.status(422).send(errorId.details[0].message);
        };

        let id = valueId.id
        let {error, value} = updateCourseValidate(req.body);
        if (error) {
            return res.status(422).send(error.details[0].message);
        };
        let {name, image} = value;
        let course = await Course.findOne({where: {id: id, name: name}});
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
        let {error, value} = courseByIdValidate(req.params);
        if (error) {
            return res.status(422).send(error.details[0].message)
        };

        let id = value.id;
        let course = await Course.findOne({
            where: {id}
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

const getAllCourses = async (req, res) => {
    try {
        
    } catch (error) {
        logger.error(error.message);
        console.log(error.message);
    }
}

module.exports = {
    createCourse, 
    updateCourse, 
    deleteCourse
};
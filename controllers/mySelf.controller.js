const { User, Enrollment, Like, Resource, Category, Comment, Course, Center, Subject, Region } = require("../models");

const logger = require("../config/log").child({ model: "MySelf" });

const getMyData = async (req, res, model, whereCondition = {}, include = [], excludeAttributes = []) => {
    try {
        let data = await model.findAll({
            where: whereCondition,
            include,
            attributes: {
                exclude: excludeAttributes
            }
        });

        if (!data.length) {
            return res.status(404).send({ message: "Not found" });
        }

        logger.info(`Received the ${model.name.toLowerCase()}s for user - ${req.user.id}`);
        res.status(200).send(data);
    } catch (error) {
        logger.error(error.message);
        console.error(error.message);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

const getMyComments = (req, res) => getMyData(req, res, Comment, {userId: req.user.id});
const getMyResource = (req, res) => getMyData(req, res, Resource, {userId: req.user.id}, [{model: Category}], ["categoryId"]);
// const getMyEnrollment = (req, res) => getMyData(req, res, Enrollment, {userId: req.user.id}, [{model: Course}, {model: Center}, {model: Subject}], ["courseId", "centerId", "subjectId"]);
const getMyCenter = (req, res) => getMyData(req, res, Center, {userId: req.user.id}, [{model: Region}], ["regionId"]);

module.exports = {
    getMyComments,
    getMyResource,
    // getMyEnrollment,
    getMyCenter
}
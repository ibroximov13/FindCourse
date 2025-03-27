const logger = require("../config/log");
const { User, Center, CourseItem, Course } = require("../models");

const getAll = async (req, res) => {
    try {
        let userId = req.user.id;
        let myself = User.findAll({
            where: {
                id: userId
            },
            include: [
                {
                    model: Comment,
                    attributes: ["id", "message", "star"]
                },
                {
                    model: Center,
                    include: [
                        {
                            model: CourseItem,
                            include: [
                                {
                                    model: Course
                                }
                            ]
                        }
                    ]
                }
            ],
            attributes: ["fullName", "image", "email", "phone", "password"]
        });
        res.status(200).send(myself);
    } catch (error) {
        logger.error(error.message);
        console.log(error);
    }
};

module.exports = {getAll}
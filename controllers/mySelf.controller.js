const logger = require("../config/log").child({model: "MySelf"});
const { User, Center, CourseItem, Course } = require("../models");
const { sendOtpByResetPasswordValidate } = require("../validation/myself.validate");
const bcrypt = require("bcrypt");

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

const sendOtpResetPassword = async (req, res) => {
    try {
        let {error, value} = sendOtpByResetPasswordValidate(req.data);
        if (error) {
            return res.status(422).send(error.details[0].message);
        };

        let { phone, email } = value;
        
        
    } catch (error) {
        logger.error(error.message);
        console.log(error.message);
    }
}

module.exports = {getAll}
// controllers/mySelf.controller.js
const logger = require("../config/log").child({ model: "MySelf" });
const { totp } = require("otplib");
const { User, Center, CourseItem, Course, Comment } = require("../models");
const sendEmail = require("../utils/sendEmail");
const { sendOtpByResetPasswordValidate, resetPasswordValidate } = require("../validation/myself.validate");
const bcrypt = require("bcrypt");

const getAll = async (req, res) => {
    try {
        const userId = req.user.id;
        const myself = await User.findOne({  // Changed from findAll to findOne since we're getting a single user
            where: { id: userId },
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
            attributes: ["fullName", "image", "email", "phone"]
        });

        if (!myself) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(myself);
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

const sendOtpResetPassword = async (req, res) => {
    try {
        const { error, value } = sendOtpByResetPasswordValidate(req.body);  // Changed req.data to req.body
        if (error) {
            return res.status(422).json({ message: error.details[0].message });
        }

        const id = req.user.id;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const { email } = value;
        const secret = user.phone + email + "soz";  // Fixed concatenation
        const otp = totp.generate(secret);
        await sendEmail(email, otp);

        logger.info(`OTP sent successfully to ${email}`);
        res.status(200).json({ otp });
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

const verifyOtpResetPassword = async (req, res) => {
    try {
        const { error, value } = resetPasswordValidate(req.body);
        if (error) {
            return res.status(422).json({ message: error.details[0].message });
        }

        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const { email, otp, newPassword } = value;
        const secret = user.phone + email + "soz";
        const isValid = totp.verify({ token: otp, secret });

        if (!isValid) {
            logger.warn(`Invalid OTP attempt for ${user.phone}`);
            return res.status(400).json({ message: "Invalid OTP" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);  // Added await for async operation
        await user.update({ password: hashedPassword });

        logger.info(`Password updated for user ${user.email}`);
        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};



module.exports = { getAll, sendOtpResetPassword, verifyOtpResetPassword };
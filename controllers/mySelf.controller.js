const logger = require("../config/log").child({ model: "MySelf" });
const { totp } = require("otplib");
const { User, Center, CourseItem, Course, Comment } = require("../models");
const sendEmail = require("../utils/sendEmail");
const { sendOtpByResetPasswordValidate, resetPasswordValidate, updateImage } = require("../validation/myself.validate");
const bcrypt = require("bcrypt")

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
                            model: Course
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

const updateImageUser = async (req, res) => {
    try {
        const { error, value } = updateImage(req.body);
        if (error) {
            return res.status(422).json({ message: error.details[0].message });
        }

        const user = await User.findByPk(req.user.id);  // Fixed variable name and await
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const { url } = value;
        await user.update({ image: url });

        logger.info(`Profile image updated for user ${user.email}`);
        res.status(200).json({ message: "Image updated successfully", image: url });
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

const updateImageUploads = async (req, res) => {
    try {
        if (!req.file) {
            logger.warn("Image upload attempted without file");
            return res.status(400).json({ message: "Image file is required" });
        }

        const imageUrl = `${req.protocol}://${req.get("host")}/image/${req.file.filename}`;
        logger.info(`Image uploaded successfully: ${imageUrl}`);
        res.status(200).json({ 
            message: "Image uploaded successfully", 
            url: imageUrl 
        });
    } catch (error) {
        logger.error(`uploadImage error: ${error.message}`);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { getAll, sendOtpResetPassword, verifyOtpResetPassword, updateImageUser, updateImageUploads };
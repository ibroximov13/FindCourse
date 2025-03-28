const { totp } = require("otplib");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { User, Region, Session } = require("../models");
const { createUserValidate, sendOtpValidate, verifyOtpValidate, userLoginValidate, refreshTokenValidate, patchUserValidate, updateMyProfileValidate } = require("../validation/user.validate");
const { Op } = require("sequelize");
const { generateUsersExcel } = require("../utils/exel");
const sendEmail = require("../utils/sendEmail");
const logger = require("../config/log").child({ model: "user" });
const DeviceDetector = require("device-detector-js");
const deviceDetector = new DeviceDetector();

dotenv.config();

totp.options = {
    digits: 4,
    step: 300
};

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const SECRET_KEY = process.env.SECRET_KEY;
const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

async function findUser(phone) {
    return await User.findOne({ where: { phone } });
}

async function sendOtp(req, res) {
    try {
        let { error, value } = sendOtpValidate(req.body);
        if (error) {
            logger.warn(`OTP validation failed: ${error.details[0].message}`);
            return res.status(400).send(error.details[0].message);
        }

        const { phone, email } = value;

        if (!phone || !email) {
            logger.warn("Missing phone or email in OTP request");
            return res.status(400).send({ message: "Phone number and email are required!" });
        }

        let otp = totp.generate(phone + email + "soz");

        // await transporter.sendMail({
        //     from: process.env.EMAIL_USER,
        //     to: email,
        //     subject: "Sizning OTP kodingiz",
        //     text: `Sizning tasdiqlash kodingiz: ${otp}`,
        // });

        await sendEmail(email, otp);

        logger.info(`OTP sent successfully to ${email}`);
        res.send({ otp });
    } catch (error) {
        logger.error(`sendOtp error: ${error.message}`);
        res.status(500).send({ message: "OTP jo'natishda xatolik yuz berdi" });
    }
}

async function verifyOtp(req, res) {
    try {
        let { error, value } = verifyOtpValidate(req.body);
        if (error) {
            logger.warn(`OTP verification validation failed: ${error.details[0].message}`);
            return res.status(400).send(error.details[0].message);
        }

        let { phone, email, otp } = value;
        const secret = (phone + email) + "soz";
        const isValid = totp.verify({ token: otp, secret });

        if (isValid) {
            logger.info(`OTP verified successfully for ${phone}`);
            res.send({ message: "OTP verified successfully" });
        } else {
            logger.warn(`Invalid OTP attempt for ${phone}`);
            res.status(400).send({ message: "Invalid OTP" });
        }
    } catch (error) {
        logger.error(`verifyOtp error: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
}

async function register(req, res) {
    try {
        let { error, value } = createUserValidate(req.body);
        if (error) {
            logger.warn(`Registration validation failed: ${error.details[0].message}`);
            return res.status(400).send(error.details[0].message);
        }

        const { phone, password, role, photo, regionId, ...rest } = value;

        let existingUser = await User.findOne({ where: { phone } });
        if (existingUser) {
            logger.warn(`Registration attempt with existing phone: ${phone}`);
            return res.status(400).send({ message: "User already exists" });
        }

        let region = await Region.findByPk(regionId);
        if (!region) {
            logger.warn(`Invalid region ID: ${regionId}`);
            return res.status(400).send({ message: "Region not found" });
        }

        let hashedPassword = bcrypt.hashSync(password, 10);
        let newUser = await User.create({
            ...rest,
            phone,
            password: hashedPassword,
            role,
            photo: photo || null,
            regionId: region.id
        });

        logger.info(`User registered successfully with ID: ${newUser.id}`);
        res.status(201).send(newUser);
    } catch (error) {
        logger.error(`register error: ${error.message}`);
        res.status(500).send({ message: "Internal Server Error" });
    }
}

async function loginUser(req, res) {
    try {
        let { error, value } = userLoginValidate(req.body);
        if (error) {
            logger.warn(`Login validation failed: ${error.details[0].message}`);
            return res.status(400).send(error.details[0].message);
        }

        let { phone, email, password } = value;
        let userIp = req.headers["x-forwarded-for"] || req.ip;

        if (!JWT_SECRET) {
            logger.error("JWT_SECRET is not defined in environment variables");
            return res.status(500).send({ message: "Server konfiguratsiyasida xatolik: JWT_SECRET topilmadi" });
        }

        let newUser = await User.findOne({
            where: {
                [Op.and]: [{ phone: phone }, { email: email }]
            }
        });

        if (!newUser) {
            logger.warn(`Login attempt for non-existent user: ${phone}`);
            return res.status(404).send({ message: "User not found" });
        }

        let compiredPassword = bcrypt.compareSync(password, newUser.password);
        if (!compiredPassword) {
            logger.warn(`Incorrect password attempt for user: ${phone}`);
            return res.status(400).send({ message: "Password wrong error" });
        }

        let data = deviceDetector.parse(req.headers["user-agent"]);

        const accesstoken = jwt.sign(
            { id: newUser.id, role: newUser.role, userIp: userIp, data: data },
            JWT_SECRET,
            { expiresIn: "1h" }
        );
        const refreshtoken = jwt.sign(
            { id: newUser.id, userIp: userIp, data: data },
            REFRESH_SECRET,
            { expiresIn: "7d" }
        );
        refreshTokens.add(refreshtoken);

        // verifyToken o'rniga newUser.id va userIp ishlatilmoqda ✅
        let session = await Session.findOne({ where: { userId: newUser.id, userIp: userIp } });
        if (!session) {
            await Session.create({
                userIp: userIp,
                userId: newUser.id,
                data: JSON.stringify(data)
            });
        }

        logger.info(`User logged in successfully: ${newUser.id}`);
        console.log("User successfully logged in!");
        res.send({ accesstoken, refreshtoken });
    } catch (error) {
        logger.error(`loginUser error: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
}


const refreshTokens = new Set();
async function refreshToken(req, res) {
    try {
        let { error, value } = refreshTokenValidate(req.body);
        if (error) {
            logger.warn(`Refresh token validation failed: ${error.details[0].message}`);
            return res.status(400).send(error.details[0].message);
        }

        const { token } = value;
        if (!token || !refreshTokens.has(token)) {
            logger.warn("Invalid or expired refresh token attempt");
            return res.status(403).send({ message: "Refresh token noto'g'ri yoki eskirgan" });
        }

        if (!REFRESH_SECRET) {
            logger.error("REFRESH_SECRET is not defined in environment variables");
            return res.status(500).send({ message: "Server konfiguratsiyasida xatolik: REFRESH_SECRET topilmadi" });
        }

        const payload = jwt.verify(token, REFRESH_SECRET);
        const newAccessToken = jwt.sign({ id: payload.id, role: payload.role }, JWT_SECRET, { expiresIn: "1h" });

        logger.info(`Token refreshed successfully for user: ${payload.id}`);
        res.json({ accesstoken: newAccessToken });
    } catch (error) {
        logger.error(`refreshToken error: ${error.message}`);
        res.status(403).send({ message: "Noto'g'ri refresh token" });
    }
}

async function getAllUsers(req, res) {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const offset = (page - 1) * limit;
        const name = req.query.name || "";
        const order = req.query.order === "DESC" ? "DESC" : "ASC";
        const column = req.query.column || "id";

        let users = await User.findAll({
            where: {
                fullName: {
                    [Op.like]: `%${name}%`
                }
            },
            limit: limit,
            offset: offset,
            order: [[column, order]],
            include: [{ model: Region, attributes: ["id", "name"] }]
        });

        logger.info(`Fetched ${users.length} users (Page: ${page})`);
        res.status(200).send(users);
    } catch (error) {
        logger.error(`getAllUsers error: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
}

async function updateUser(req, res) {
    try {
        let { error, value } = patchUserValidate(req.body);
        if (error) {
            logger.warn(`Update user validation failed: ${error.details[0].message}`);
            return res.status(400).send(error.details[0].message);
        }

        let user = await User.findByPk(req.params.id);
        if (!user) {
            logger.warn(`User not found for update with ID: ${req.params.id}`);
            return res.status(404).send({ message: "User not found" });
        }

        if (Object.keys(value).length === 0) {
            logger.warn(`No fields provided for update for user ID: ${req.params.id}`);
            return res.status(400).json({ message: "No fields to update" });
        }

        await user.update(value);
        logger.info(`User updated successfully with ID: ${req.params.id}`);
        res.send(user);
    } catch (error) {
        logger.error(`updateUser error: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
}

async function deleteUser(req, res) {
    try {
        let id = req.params.id;
        let user = await User.findByPk(id);
        if (!user) {
            logger.warn(`User not found for delete with ID: ${id}`);
            return res.status(404).send({ message: "User not found" });
        }

        await user.destroy();
        logger.info(`User deleted successfully with ID: ${id}`);
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        logger.error(`deleteUser error: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
}

async function createAdminOrSuperAdmin(req, res) {
    try {
        let { error, value } = createUserValidate(req.body, {
            stripUnknown: true,
            context: { isAdminCreation: true }
        });
        if (error) {
            logger.warn(`Admin/SuperAdmin creation validation failed: ${error.details[0].message}`);
            return res.status(400).send(error.details[0].message);
        }

        const { phone, password, role, ...rest } = value;

        if (!role || !["ADMIN", "SUPERADMIN"].includes(role.toUpperCase())) {
            logger.warn(`Invalid role provided for admin creation: ${role}`);
            return res.status(400).send({ message: "Role faqat ADMIN yoki SUPERADMIN bo'lishi kerak" });
        }

        if (req.user.role !== "ADMIN") {
            logger.warn(`Unauthorized admin creation attempt by role: ${req.user.role}`);
            return res.status(403).send({ message: "Admin yoki SuperAdmin yaratishga ruxsatingiz yo'q!" });
        }

        let existingUser = await User.findOne({ where: { phone } });
        if (existingUser) {
            logger.warn(`Admin creation attempt with existing phone: ${phone}`);
            return res.status(400).send({ message: "User already exists" });
        }

        if ("regionId" in rest) {
            logger.warn("RegionId provided for Admin/SuperAdmin creation");
            return res.status(400).send({ message: "ADMIN va SUPERADMIN uchun regionId kiritilmaydi" });
        }

        let hashedPassword = bcrypt.hashSync(password, 10);
        let newAdmin = await User.create({
            ...rest,
            phone,
            password: hashedPassword,
            role: role.toUpperCase() // ADMIN yoki SUPERADMIN
        });

        logger.info(`${role} created successfully with ID: ${newAdmin.id}`);
        res.status(201).json({ user: newAdmin });
    } catch (error) {
        logger.error(`createAdminOrSuperAdmin error: ${error.message}`);
        res.status(500).send({ message: "Internal Server Error" });
    }
}

async function getMeProfile(req, res) {
    try {
        const userId = req.user.id;
        const user = await User.findOne({
            where: { id: userId },
            attributes: ["id", "fullName", "email", "phone", "image"]
        });

        if (!user) {
            logger.warn(`Profile not found for user ID: ${userId}`);
            return res.status(404).json({ error: "User not found" });
        }

        logger.info(`Profile fetched for user ID: ${userId}`);
        res.status(200).json(user);
    } catch (error) {
        logger.error(`getMeProfile error: ${error.message}`);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function updateMyProfile(req, res) {
    try {
        let { error, value } = updateMyProfileValidate(req.body);
        if (error) {
            logger.warn(`Profile update validation failed: ${error.details[0].message}`);
            return res.status(400).send(error.details[0].message);
        }

        const userId = req.user.id;
        const user = await User.findOne({
            where: { id: userId },
            attributes: ["id", "fullName", "email", "password", "image"]
        });

        if (!user) {
            logger.warn(`User not found for profile update: ${userId}`);
            return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
        }

        let { fullName, photo, email, password } = value;
        let updatedData = { fullName, email, photo };

        if (password) {
            updatedData.password = bcrypt.hashSync(password, 10);
        }

        await user.update(updatedData);
        logger.info(`Profile updated successfully for user ID: ${userId}`);
        res.json({ message: "Profile successfully updated", user });
    } catch (error) {
        logger.error(`updateMyProfile error: ${error.message}`);
        res.status(500).json({ message: "Ichki server xatosi" });
    }
}

async function downloadUsersExcel(req, res) {
    try {
        const users = await User.findAll();

        if (users.length === 0) {
            logger.warn("No users found for Excel export");
            return res.status(404).json({ error: "Foydalanuvchilar topilmadi" });
        }

        const workbook = await generateUsersExcel(users);

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=users.xlsx"
        );

        await workbook.xlsx.write(res);
        logger.info(`Users Excel exported successfully, count: ${users.length}`);
        res.end();
    } catch (error) {
        logger.error(`downloadUsersExcel error: ${error.message}`);
        res.status(500).json({ error: "Excel fayq yaratishda xatolik yuz berdi" });
    }
}

async function uploadImage(req, res) {
    try {
        if (!req.file) {
            logger.warn("Image upload attempted without file");
            return res.status(400).json({ error: "Rasm yuklanishi kerak" });
        }

        const imageUrl = `${req.protocol}://${req.get("host")}/image/${req.file.filename}`;
        logger.info(`Image uploaded successfully: ${imageUrl}`);
        res.status(200).json({ message: "Rasm muvaffaqiyatli yuklandi", url: imageUrl });
    } catch (error) {
        logger.error(`uploadImage error: ${error.message}`);
        res.status(500).json({ error: error.message || "Serverda xatolik yuz berdi" });
    }
}

module.exports = {
    findUser,
    sendOtp,
    verifyOtp,
    register,
    uploadImage,
    refreshToken,
    loginUser,
    getAllUsers,
    updateUser,
    deleteUser,
    createAdminOrSuperAdmin,
    getMeProfile,
    updateMyProfile,
    downloadUsersExcel
};
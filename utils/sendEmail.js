const nodemailer = require("nodemailer");
require("dotenv").config();
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});

async function sendEmail(email, otp) {
    try {
        await transporter.sendMail({
            to: email,
            subject: "confirmation code",
            from: process.env.EMAIL_USER,
            text: `your one time password is ${otp}`,
        })
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = sendEmail
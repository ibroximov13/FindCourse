const Joi = require("joi");

const sendOtpByResetPasswordValidate = (data) => {
    const schema = Joi.object({
        phone: Joi.string().pattern(/^\+998[0-9]{9}$/).opt(),
        email: Joi.string().email().required(),
    });
    return schema.validate(data);
};

const resetPasswordValidate = (data) => {
    const schema = Joi.object({
        otp: Joi.string().min(4).max(4).required(),
        newPassword: Joi.string().min(6).required()
    });
    return schema.validate(data);
}

const updateImage = (data) => {
    const schema = Joi.object({
        image: Joi.string().min(3).required()
    });
    return schema.validate(data);
}

module.exports = {
    sendOtpByResetPasswordValidate,
    resetPasswordValidate,
    updateImage
}
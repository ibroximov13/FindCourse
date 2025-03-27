const Joi = require("joi");

const createUserValidate = (data) => {
  const schema = Joi.object({
    fullName: Joi.string().min(3).max(100).required(),
    year: Joi.number()
      .integer()
      .min(1900)
      .max(new Date().getFullYear())
      .required()
      .custom((value, helpers) => {
        const currentYear = new Date().getFullYear();
        const age = currentYear - value;
        if (age < 15) {
          return helpers.error("any.custom", { message: "Foydalanuvchi yoshi 15 dan katta bo'lishi kerak" });
        }
        return value;
      }),
    phone: Joi.string().pattern(/^\+998[0-9]{9}$/).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    regionId: Joi.number().integer().required().when("role", {
      is: Joi.string().valid("ADMIN", "SUPERADMIN"),
      then: Joi.forbidden(),
      otherwise: Joi.number().integer().required()
    }),
    photo: Joi.string().required(),
    role: Joi.string().valid("USER", "SELLER").required(),
  });
  return schema.validate(data);
};

const patchUserValidate = (data) => {
  const schema = Joi.object({
    fullName: Joi.string().min(3).max(100).optional(),
    year: Joi.number().integer().min(1900).max(new Date().getFullYear()).optional()
      .custom((value, helpers) => {
        const currentYear = new Date().getFullYear();
        const age = currentYear - value;
        if (age < 15) {
          return helpers.error("any.custom", { message: "Foydalanuvchi yoshi 15 dan katta bo'lishi kerak" });
        }
        return value;
      }),
    phone: Joi.string().pattern(/^\+998[0-9]{9}$/).optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(4).optional(),
    regionId: Joi.number().integer().optional(),
    photo: Joi.string().optional(),
    role: Joi.string().valid("USER", "ADMIN", "SUPERADMIN", "SELLER").optional(),
  });
  return schema.validate(data);
};

const sendOtpValidate = (data) => {
  const schema = Joi.object({
    phone: Joi.string().pattern(/^\+998[0-9]{9}$/).required(),
    email: Joi.string().email().required()
  });
  return schema.validate(data);
};

const verifyOtpValidate = (data) => {
  const schema = Joi.object({
    phone: Joi.string().pattern(/^\+998[0-9]{9}$/).required(),
    email: Joi.string().email().required(),
    otp: Joi.string().max(4).min(4).required()
  });
  return schema.validate(data);
};

const userLoginValidate = (data) => {
  const schema = Joi.object({
    phone: Joi.string().pattern(/^\+998[0-9]{9}$/).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  });
  return schema.validate(data);
};

const refreshTokenValidate = (data) => {
  const schema = Joi.object({
    token: Joi.string().required()
  });
  return schema.validate(data);
};

const updateMyProfileValidate = (data) => {
  const schema = Joi.object({
    fullName: Joi.string().min(2).max(50).optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(6).optional(),
    photo: Joi.string().optional()
  });
  return schema.validate(data);
};

module.exports = { createUserValidate, patchUserValidate, sendOtpValidate, verifyOtpValidate, userLoginValidate, refreshTokenValidate, updateMyProfileValidate };
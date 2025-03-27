const Joi = require('joi');

const createCenterValidation = Joi.object({
  name: Joi.string().required(),
  regionId: Joi.number().integer().required(),
  adress: Joi.string().required(),
  phone: Joi.string().required(),
  location: Joi.string().required(),
  subjects: Joi.array().items(Joi.number().integer()).optional(),
  courses: Joi.array().items(Joi.number().integer()).optional(),
});

const updateCenterValidation = Joi.object({
  name: Joi.string().optional(),
  regionId: Joi.number().integer().optional(),
  adress: Joi.string().optional(),
  phone: Joi.string().optional(),
  location: Joi.string().optional()
});

module.exports = {
  createCenterValidation,
  updateCenterValidation,
};
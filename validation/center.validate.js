const Joi = require('joi');

const createCenterValidation = Joi.object({
  name: Joi.string().required(),
  regionId: Joi.number().integer().required(),
  address: Joi.string().required(),
  phone: Joi.string().required(),
  location: Joi.string().required(),
});

const updateCenterValidation = Joi.object({
  name: Joi.string().optional(),
  regionId: Joi.number().integer().optional(),
  address: Joi.string().optional(),
  phone: Joi.string().optional(),
  location: Joi.string().optional()
});

module.exports = {
  createCenterValidation,
  updateCenterValidation,
};
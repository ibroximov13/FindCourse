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
    location: Joi.string().optional(),
    star: Joi.number().integer().optional(),
    filial: Joi.number().integer().optional()
  });
  
  const paginationAndFilterValidation = Joi.object({
    page: Joi.number().integer().min(1).optional(),
    limit: Joi.number().integer().min(1).optional(),
    name: Joi.string().optional(),
    regionId: Joi.number().integer().optional(),
    order: Joi.string().valid("ASC", "DESC").optional(),
  });
  
  module.exports = {
    createCenterValidation,
    updateCenterValidation,
    paginationAndFilterValidation,
  };
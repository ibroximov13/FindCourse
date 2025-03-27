const Joi = require("joi");

const createLikeSchema = Joi.object({
  userId: Joi.number().integer().required(),
  centerId: Joi.number().integer().required(),
});

const updateLikeSchema = Joi.object({
  userId: Joi.number().integer(),
  centerId: Joi.number().integer(),
}).min(1);

const idSchema = Joi.object({
  id: Joi.number().integer().required(),
});

module.exports = {
  createLikeSchema,
  updateLikeSchema,
  idSchema,
};
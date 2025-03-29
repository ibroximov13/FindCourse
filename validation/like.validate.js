const Joi = require("joi");

const createLikeSchema = Joi.object({

  centerId: Joi.number().integer().required(),
});

module.exports = { createLikeSchema };
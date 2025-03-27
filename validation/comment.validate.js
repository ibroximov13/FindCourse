const Joi = require('joi');

const CommentValidationCreate = Joi.object({
  centerId: Joi.number().integer().required(),
  star: Joi.number().integer().min(1).max(5).required(),
  message: Joi.string().max(1000).required(),
});

const CommentValidationUpdate = Joi.object({
  centerId: Joi.number().integer(),
  star: Joi.number().integer().min(1).max(5),
  message: Joi.string().max(1000),
});

module.exports = {
  CommentValidationCreate,
  CommentValidationUpdate,
};

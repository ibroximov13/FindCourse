const Joi = require('joi');

const CommentValidationCreate = Joi.object({
  user_id: Joi.number().integer().required(),
  center_id: Joi.number().integer().required(),
  star: Joi.number().integer().min(1).max(5).required(),
  message: Joi.string().max(1000).required(),
});

const CommentValidationUpdate = Joi.object({
  user_id: Joi.number().integer(),
  center_id: Joi.number().integer(),
  star: Joi.number().integer().min(1).max(5),
  message: Joi.string().max(1000),
});

module.exports = {
  CommentValidationCreate,
  CommentValidationUpdate,
};

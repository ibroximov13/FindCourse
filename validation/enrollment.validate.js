const Joi = require("joi");

const createEnrollmentSchema = Joi.object({
  userId: Joi.number().integer().required(),
  courseId: Joi.number().integer().required(),
  centerId: Joi.number().integer().required(),
  date: Joi.date().required(),
  subjectId: Joi.number().integer().required(),
});

const updateEnrollmentSchema = Joi.object({
  userId: Joi.number().integer(),
  courseId: Joi.number().integer(),
  centerId: Joi.number().integer(),
  date: Joi.date(),
  subjectId: Joi.number().integer(),
});

module.exports = {
  createEnrollmentSchema,
  updateEnrollmentSchema,
};
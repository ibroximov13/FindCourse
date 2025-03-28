const Joi = require("joi");

const createEnrollmentSchema = Joi.object({
  courseId: Joi.number().integer().required(),
  centerId: Joi.number().integer().required(),
  subjectId: Joi.number().integer().required(),
  date: Joi.date().required(),
});

const updateEnrollmentSchema = Joi.object({
  courseId: Joi.number().integer().optional(),
  centerId: Joi.number().integer().optional(),
  subjectId: Joi.number().integer().optional(),
  date: Joi.date().optional(),
});

module.exports = {
  createEnrollmentSchema,
  updateEnrollmentSchema,
};
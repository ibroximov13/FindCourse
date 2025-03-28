const Joi = require('joi');

const createEnrollmentSchema = Joi.object({
<<<<<<< HEAD
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
=======
  centerId: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'centerId must be a number',
      'number.integer': 'centerId must be an integer',
      'number.positive': 'centerId must be a positive number',
      'any.required': 'centerId is required'
    }),
  
  courseId: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'courseId must be a number',
      'number.integer': 'courseId must be an integer',
      'number.positive': 'courseId must be a positive number',
      'any.required': 'courseId is required'
    }),
  
  subjectId: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'subjectId must be a number',
      'number.integer': 'subjectId must be an integer',
      'number.positive': 'subjectId must be a positive number',
      'any.required': 'subjectId is required'
    }),
  
  monthId: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'monthId must be a number',
      'number.integer': 'monthId must be an integer',
      'number.positive': 'monthId must be a positive number',
      'any.required': 'monthId is required'
    })
>>>>>>> 0854c253cf783d19f1981b6e05df60d5ac51d6a5
});

module.exports = {
  createEnrollmentSchema
};
const Joi = require('joi');

const createEnrollmentSchema = Joi.object({
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
    .optional()
    .messages({
      'number.base': 'courseId must be a number',
      'number.integer': 'courseId must be an integer',
      'number.positive': 'courseId must be a positive number'
    }),
  
  subjectId: Joi.number()
    .integer()
    .positive()
    .optional()
    .messages({
      'number.base': 'subjectId must be a number',
      'number.integer': 'subjectId must be an integer',
      'number.positive': 'subjectId must be a positive number'
    }),
}).or('courseId', 'subjectId'); 

module.exports = {
  createEnrollmentSchema
};
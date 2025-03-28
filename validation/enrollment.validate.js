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
});

module.exports = {
  createEnrollmentSchema
};
const Joi = require("joi");

const createCourseValidate = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        image: Joi.string().required()
    });
    return schema.validate(data);
};

const updateCourseValidate = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).optional(),
        image: Joi.string().optional()
    });
    return schema.validate(data);
};

const courseByIdValidate = (data) => {
    const schema = Joi.object({
        id: Joi.number().integer().required()
    });
    return schema.validate(data);
}

module.exports = {
    createCourseValidate, 
    updateCourseValidate,
    courseByIdValidate
}
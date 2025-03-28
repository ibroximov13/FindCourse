const Joi = require("joi");

const createCategoryValidate = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        image: Joi.string().required()
    });
    return schema.validate(data);
};

const updateCategoryValidate = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).optional(),
        image: Joi.string().optional()
    });
    return schema.validate(data);
}

const categoryByIdValidate = (data) => {
    const schema = Joi.object({
        id: Joi.number().integer().required()
    });
    return schema.validate(data);
}

module.exports = {
    createCategoryValidate, 
    updateCategoryValidate,
    categoryByIdValidate
}
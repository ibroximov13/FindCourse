const Joi = require("joi");

const createResourceValidate = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        image: Joi.string().required(),
        description: Joi.string().min(3).required(),
        media: Joi.string().required(),
        userId: Joi.number().integer().required(),
        categoryId: Joi.number().integer().required()
    });
    return schema.validate(data);
};

const updateResourceValidate = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).optional(),
        image: Joi.string().optional(),
        description: Joi.string().min(3).optional(),
        media: Joi.string().optional(),
        userId: Joi.number().integer().optional(),
        categoryId: Joi.number().integer().optional()
    });
    return schema.validate(data);
};

const resourceByIdValidate = (data) => {
    const schema = Joi.object({
        id: Joi.number().integer().required()
    });
    return schema.validate(data);
}

module.exports = {
    createResourceValidate, 
    updateResourceValidate,
    resourceByIdValidate
}
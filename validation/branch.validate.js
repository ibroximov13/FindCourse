const Joi = require("joi");

const createBranchValidate = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        phone: Joi.string().pattern(/^\+998[0-9]{9}$/).required(),
        location: Joi.string().min(3).max(50).required(),
        regionId: Joi.number().integer().required(),
        centerId: Joi.number().integer().required(),
        image: Joi.string().optional(),
        subjectIds: Joi.array().items(Joi.number().integer()).optional(), 
        courseIds: Joi.array().items(Joi.number().integer()).optional() 
    });
    return schema.validate(data);
};

const updateBranchValidate = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).optional(),
        phone: Joi.string().pattern(/^\+998[0-9]{9}$/).optional(),
        location: Joi.string().min(3).max(50).optional(),
        regionId: Joi.number().integer().optional(),
        centerId: Joi.number().integer().optional(),
        image: Joi.string().optional(),
        subjectIds: Joi.array().items(Joi.number().integer()).optional(), 
        courseIds: Joi.array().items(Joi.number().integer()).optional()  
    });
    return schema.validate(data);
};

const branchByIdValidate = (data) => {
    const schema = Joi.object({
        id: Joi.number().integer().required()
    });
    return schema.validate(data);
};

module.exports = {
    createBranchValidate,
    updateBranchValidate,
    branchByIdValidate
};
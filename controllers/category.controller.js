const logger = require("../config/log").child({model: "Category"});
const { Op, col } = require("sequelize");
const { Category } = require("../models");
const { createCategoryValidate, categoryByIdValidate, updateCategoryValidate } = require("../validation/category.validate");

const createCategory = async (req, res) => {
    try {
        let {error, value} = createCategoryValidate(req.body);
        if (error) {
            return res.status(422).send(error.details[0].message);
        }
        let {name, image} = value;
        let category = await Category.findOne({
            where: {
                name: name
            }
        });

        if (category) {
            return res.status(400).send("category already exists");
        };

        let newCategory = await Category.create({
            name, 
            image
        });

        logger.info(`created new category - name: ${name}`);
        res.status(201).send(newCategory);
    } catch (error) {
        console.log(error);
    }
};

const updateCategory = async (req, res) => {
    try {
        let {error: errorId, value: valueId} = categoryByIdValidate(req.params);
        if (errorId) {
            return res.status(422).sens(errorId.details[0].message);
        };
        let {error, value} = updateCategoryValidate(req.body);
        if (error) {
            return res.status(422).send(error.details[0].message);
        };

        let id = valueId.id;
        let {name, image} = value;
    
        let category = await Category.findOne({
            where: {
                id
            }
        });

        if (!category) {
            return res.status(404).send("Category not found");
        };

        let updatedCategory = await category.update({name, image});
        logger.info(`updated category - id: ${id}`)
        req.status(200).send(updatedCategory);
    } catch (error) {
        logger.error(error.message);
        console.log(error);
    }
};

const deleteCategory = async (req, res) => {
    try {
        let {error, value} = categoryByIdValidate(req.params);
        if (error, value) {
            return res.status(422).send(error.details[0].message);
        };
        let id = value.id;

        let category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).send("Category not found");
        }

        let deletedCategory = await category.destroy();
        logger.info(`Deleted category - id: ${id}`);
        res.status(200).send(deletedCategory);
        
    } catch (error) {
        logger.error(error.message)
        console.log(error.message);
    }
};

const getAllCategory = async (req, res) => {
    try {
        let page = req.query.page || 1;
        let take = req.query.take || 10;
        let offset = ( page - 1 ) * take;

        let filter = req.query.filter || "";
        const order = req.query.order === "DESC" ? "DESC" : "ASC";
        const allowedColumns = ["id", "name"];
        const column = allowedColumns.includes(req.query.column) ? req.query.column : "id";

        let category = await Category.findAll({
            where: {
                name: {
                    [Op.like]: `%${filter}%`
                }
            },
            limit: take,
            offset: offset,
            order: [[column, order]]
        });

        logger.info("getAllCategory");
        res.status(200).send(category);

    } catch (error) {
        logger.error(error.message)
        console.log(error.message);
    }
};

const getOneCategory = async (req, res) => {
    try {
        let {error, value} = categoryByIdValidate(req.params);
        if (error) {
            return res.status(422).send(error.details[0].message);
        };
        let id = value.id;

        let category = await Category.findByPk(id);
        logger.info(`getOneCateogry - id: ${id}`);
        res.status(200).send(category);
    } catch (error) {
        logger.error(error.message);
        console.log(error.message);
    }
};

module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    getAllCategory,
    getOneCategory
}
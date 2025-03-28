const { Op } = require("sequelize");
const { Resource, User, Category } = require("../models");
const { createResourceValidate, resourceByIdValidate, updateResourceValidate } = require("../validation/resource.validate")

const logger = require("../config/log").child({model: "Resource"});

const createResource = async (req, res) => {
    try {
        let {error, value} = createResourceValidate(req.body);
        if (error) {
            return res.status(422).send(error.details[0].message)
        };

        let {name} = value;
        let resource = await Resource.findOne({
            where: {
                name
            }
        })

        if (resource) {
            return res.status(400).send("Resource already exists");
        };

        let newResource = await Resource.create(value);
        logger.info("Created new resource");
        res.status(201).send(newResource);
    } catch (error) {
        logger.error(error.message);
        console.log(error.message);
    }
};

const updateResourse = async (req, res) => {
    try {
        let {error: errorId, value: valueId} = resourceByIdValidate(req.params);
        if (errorId) {
            return res.status(422).send(errorId.details[0].message);
        };
        
        let id = valueId.id;

        let {error, value} = updateResourceValidate(req.body);
        if (error) {
            return res.status(422).send(error.details[0].message);
        }
        let resourse = await Resource.findByPk(id);
        if (!resourse) {
            return res.status(404).send("Resourse not found");
        };

        let updatedResource = await resourse.update(value);

        logger.info(`Resource updated - id: ${id}`);
        res.send(updatedResource);

    } catch (error) {
        logger.error(error.message);
        console.log(error.message);
    }
};

const deleteResource = async (req, res) => {
    try {
        let {error, value} = resourceByIdValidate(req.params);
        if (error) {
            return res.status(422).send(error.details[0].message);
        };
        let id = value.id;

        let resource = await Resource.findByPk(id);
        if (!resource) {
            return res.status(404).send("Resource not found");
        };

        let deletedResource = await resource.destroy();
        logger.info(`Deleted resource - id: ${id}`);
        res.status(200).send(deletedResource);
    } catch (error) {
        logger.error(error.message);
        console.log(error.message);
    }
};

const getAllResource = async (req, res) => {
    try {
        let page = req.query.page || 1;
        let take = req.query.take || 10;
        let offset  = ( page - 1 ) * take;

        let filter = req.query.filter || "";
        let order = req.query.order === "DESC" ? "DESC" : "ASC";
        let allowedColumns = ["id", "name", "price"];
        let column = allowedColumns.includes(req.query.column) ? req.query.column : "id";

        let resource = await Resource.findAll({
            where: {
                name: {
                    [Op.like]: `%${filter}%`
                },
            },
            limit: take,
            offset: offset,
            order: [[column, order]],
            include: [
                {
                    model: User,
                    attributes: ["fullName", "email", "phone"]
                },
                {
                    model: Category,
                    attributes: ["name", "image"]
                }
            ]
        });

        logger.info("getAllResource");
        res.status(200).send(resource);

    } catch (error) {
        logger.error(error.message);
        console.log(error.message);
    }
};

const getOneResource = async (req, res) => {
    try {
        let {error, value} = resourceByIdValidate(req.body);
        if (error) {
            return res.status(422).send(error.details[0].message);
        };
        let id = value.id;

        let resource = await Resource.findOne({where: {
            id: id,
            include: [
                {
                    model: User,
                    attributes: ["fullName", "email", "phone"]
                },
                {
                    model: Category,
                    attributes: ["name", "image"]
                }
            ]
        }});

        logger.info(`GetOneResource - id: ${id}`);
        res.status(200).send(resource);

    } catch (error) {
        logger.error(error.message);
        console.log(error.message);
    };
};

const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "Rasm yuklanishi kerak" });
        }
        const imageUrl = `${req.protocol}://${req.get("host")}/image/${req.file.filename}`;
        res.status(200).json({ url: imageUrl });
    } catch (error) {
        res.status(500).json({ error: "Serverda xatolik yuz berdi" });
    }
};

module.exports = {
    createResource,
    updateResourse,
    deleteResource,
    getAllResource,
    getOneResource,
    uploadImage
}
const { Op } = require("sequelize");
const { Subject, SubjectItem, BranchSubItem, Branch, Center } = require("../models");
const { createSubjectValidate, subjectByIdValidate, updateSubjectValidate } = require("../validation/subject.validate");

const logger = require("../config/log").child({ model: "Subject" });

const createSubject = async (req, res) => {
    try {
        let { error, value } = createSubjectValidate(req.body);
        if (error) {
            return res.status(422).send(error.details[0].message);
        };

        let { name, image } = value;
        let subject = await Subject.findOne({ where: { name } });
        if (subject) {
            return res.status(400).send("Subject already exists");
        };

        let newSubject = await Subject.create({
            name, image
        });

        res.status(201).send(newSubject);
    } catch (error) {
        logger.error(error.message)
        console.log(error.message);
    }
};

const updateSubject = async (req, res) => {
    try {
        let { error: errorId, value: valueId } = subjectByIdValidate(req.params);
        if (errorId) {
            return res.status(422).send(errorId.details[0].message);
        }

        let id = valueId.id;
        let { error, value } = updateSubjectValidate(req.body);
        if (error) {
            return res.status(422).send(error.details[0].message);
        }

        let { name, image } = value;
        let subject = await Subject.findOne({ where: { id: id } });

        if (!subject) {
            return res.status(404).send("Subject not found");
        }

        if (name && name !== subject.name) {
            let exists = await Subject.findOne({ where: { name: name } });
            if (exists) {
                return res.status(400).send("Subject already exists");
            }
        }

        let updatedSubject = await subject.update({
            name: name || subject.name,
            image: image || subject.image
        });

        logger.info("Subject updated");
        res.status(200).send({ message: "Subject updated successfully", subject: updatedSubject });
    } catch (error) {
        b
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
};



const deleteSubject = async (req, res) => {
    try {
        let { error, value } = subjectByIdValidate(req.params);
        if (error) {
            return res.status(422).send(error.details[0].message)
        };

        let id = value.id;
        let subject = await Subject.findOne({
            where: { id }
        });

        if (!subject) {
            return res.status(404).send("Subject not found");
        };

        let deletedSubject = await subject.destroy();
        logger.info(`Deleted subject - id: ${id}`);
        res.status(200).send(deletedSubject)
    } catch (error) {
        logger.error(error.message);
        console.log(error.message);
    };
};

const getAllSubjects = async (req, res) => {
    try {
        let page = parseInt(req.query.page) || 1;
        let take = parseInt(req.query.take) || 10;
        let offset = (page - 1) * take;

        let filter = req.query.filter || "";
        let order = req.query.order === "DESC" ? "DESC" : "ASC";
        let allowedColumns = ["id", "name", "phone", "location", "regionId", "centerId"];
        let column = allowedColumns.includes(req.query.column) ? req.query.column : "id";

        const subject = await Subject.findAll({
            where: {
                name: {
                    [Op.like]: `%${filter}%`
                }
            },
            include: [
                {
                    model: Branch,
                    attributes: ["id", "phone", "location"]
                },
                {
                    model: Center,
                    attributes: ["id", "name", "adress", "location"]
                }
            ],
            limit: take,
            offset: offset,
            order: [[column, order]]
        });

        logger.info("GetAllSubjects");
        res.status(200).send(subject);
    } catch (error) {
        logger.error(error.message);
        console.log(error.message);
    }
};

const getOneSubject = async (req, res) => {
    try {
        let { error, value } = subjectByIdValidate(req.params);
        if (error) {
            return res.status(422).send(error.details[0].message);
        }

        let id = value.id;

        let subject = await Subject.findOne({
            where: {
                id: id,
            },
            include: [
                {
                    model: Branch,
                    attributes: ["id", "phone", "location"]
                },
                {
                    model: Center,
                    attributes: ["id", "name", "adress", "location"]
                }
            ],
        });

        logger.info("GetOneSubject");
        res.status(200).send(subject);

    } catch (error) {
        logger.error(error.message);
        console.log(error.message);
    }
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
    createSubject,
    updateSubject,
    deleteSubject,
    getAllSubjects,
    getOneSubject,
    uploadImage
};
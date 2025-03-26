const { Subject, SubjectItem } = require("../models");
const { createSubjectValidate, subjectByIdValidate, updateSubjectValidate } = require("../validation/subject.validate");

const logger = require("../config/log").child({model: "Subject"});

const createSubject = async (req, res) => {
    try {
        let {error, value} = createSubjectValidate(req.body);
        if (error) {
            return res.status(422).send(error.details[0].message);
        };

        let {name, image} = value;
        let subject = await Subject.findOne({where: {name}});
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
        let {error: errorId, value: valueId} = subjectByIdValidate(req.params);
        if (errorId) {
            return res.status(422).send(errorId.details[0].message);
        };

        let id = valueId.id
        let {error, value} = updateSubjectValidate(req.body);
        if (error) {
            return res.status(422).send(error.details[0].message);
        };
        let {name, image} = value;
        let subject = await Subject.findOne({where: {id: id, name: name}});
        if (!subject) {
            return res.status(400).send("Subject already exists");
        };

        let updatedSubject = await subject.update({
            name: name || subject.name,
            image: image || subject.image
        });

        logger.info("subject updated");
        res.status(200).send(updatedSubject);
    } catch (error) {
        logger.error(error.message)
        console.log(error.message);
    };
};



const deleteSubject = async (req, res) => {
    try {
        let {error, value} = subjectByIdValidate(req.params);
        if (error) {
            return res.status(422).send(error.details[0].message)
        };

        let id = value.id;
        let subject = await Subject.findOne({
            where: {id}
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
        
    } catch (error) {
        logger.error(error.message);
        console.log(error.message);
    }
}

module.exports = {
    createSubject, 
    updateSubject, 
    deleteSubject
};
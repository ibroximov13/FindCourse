const logger = require("../config/log").child({ model: "Branch" });
const { Op } = require("sequelize");
const { Region, Center, BranchSubItem, BranchCourseItem, Subject, Course, Branch } = require("../models/index.js");
const { createBranchValidate, updateBranchValidate, branchByIdValidate } = require("../validation/branch.validate");

const createNewBranch = async (req, res) => {
    try {
        let { error, value } = createBranchValidate(req.body);
        if (error) {
            return res.status(422).send(error.details[0].message);
        }
        let { name, location, subjects, courses, ...rest } = value;
        let branch = await Branch.findOne({
            where: {
                name: name,
                location: location
            }
        });

        if (branch) {
            logger.warn(`Branch creation attempt failed: A branch with name "${name}" already exists at location "${location}". User ID: ${req.user.id}`);
            return res.status(400).send("There cannot be multiple branches with the same name in the same location.");
        }

        let newBranch = await Branch.create({
            ...rest,
            name,
            location
        });

        let branchId = newBranch.id;
        let a = subjects.map((r) => {
            return {
                subjectId: r,
                branchId: branchId
            }
        });
        await BranchSubItem.bulkCreate(a);

        let b = courses.map((r) => {
            return {
                courseId: r,
                branchId: branchId
            }
        });

        await BranchCourseItem.bulkCreate(b);

        logger.info(`A new branch was created by ${req.user?.id || "an unknown user"}`);
        res.status(201).send(newBranch);
    } catch (error) {
        logger.error("Error!", error.message);
        console.log(error);
    }
};

const updateBranch = async (req, res) => {
    try {
        let { error: errorId, value: valueId } = branchByIdValidate(req.params);
        if (errorId) {
            return res.status(400).send(errorId.details[0].message);
        };
        let id = valueId.id;
        let { error, value } = updateBranchValidate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        };
        let { name, phone, image, location, regionId, centerId } = value;
        let branch = await Branch.findByPk(id);
        if (!branch) {
            return res.status(404).send("Branch not found");
        };

        let updatedBranch = await branch.update({
            name: name || branch.name,
            phone: phone || branch.phone,
            image: image || branch.image,
            location: location || branch.location,
            regionId: regionId || branch.regionId,
            centerId: centerId || branch.centerId
        });

        let updateData = { ...branch.toJson(), ...value };

        res.send(updatedBranch)
    } catch (error) {
        logger.error("Error!", error.message);
        console.log(error);
    }
};

const deleteBranch = async (req, res) => {
    try {
        let { error, value } = branchByIdValidate(req.params);
        if (error) {
            return res.status(422).send(error.details[0].message);
        }
        let id = value.id;

        let branch = await Branch.findByPk(id);
        if (!branch) {
            return res.status(404).send("Branch not found");
        };

        let deletedBranch = await branch.destroy();
        logger.info(`This branch deleted id = ${branch.id}`);
        res.status(200).send(deletedBranch);
    } catch (error) {
        logger.error(err.message)
        console.log(error);
    }
};

const getAllBranchs = async (req, res) => {
    try {
        let page = parseInt(req.query.page) || 1;
        let take = parseInt(req.query.take) || 10;
        let offset = (page - 1) * take;

        let filter = req.query.filter || "";
        let order = req.query.order === "DESC" ? "DESC" : "ASC";
        let allowedColumns = ["id", "name", "phone", "location", "regionId", "centerId"];
        let column = allowedColumns.includes(req.query.column) ? req.query.column : "id";

        let branch = await Branch.findAll({
            
            include: [
                {
                    model: Region,
                    attributes: ["name"],
                },
                {
                    model: Center,
                    attributes: ["id", "name", "phone", "location"]
                },
                {
                    model: Subject, 
                    through: { attributes: [] } 
                },
                {
                    model: Course, 
                    through: { attributes: [] } 
                },
            ],
            // group: ["Branch.id", "region.id", "center.id"], 
            subQuery: false,
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${filter}%` } },
                    { phone: { [Op.like]: `%${filter}%` } },
                    { location: { [Op.like]: `%${filter}%` } }
                ]
            },
            limit: take,
            offset: offset,
            order: [[column, order]]
        });

        logger.info(`Get all branches`);
        res.status(200).send(branch);

    } catch (error) {
        logger.error(error.message);
        console.log(error);
        res.status(500).send({ message: "Server error" }); 
    }
};

const getOneBranch = async (req, res) => {
    try {
        let { error, value } = branchByIdValidate(req.params);
        if (error) {
            return res.status(422).send(error.details[0].message);
        }
        let id = value.id;

        let branch = await Branch.findOne({
            where: { id },
            include: [
                {
                    model: Region,
                    attributes: ["name"]
                },
                {
                    model: Center,
                    attributes: ["id", "name", "adress", "phone", "location"]
                },
                {
                    model: BranchSubItem,
                    include: [
                        {
                            model: Subject,
                        }
                    ]
                },
                {
                    model: BranchCourseItem,
                    include: [
                        {
                            model: Course,
                        }
                    ]
                },
            ],
            group: ["region.id", "center.id"],
            subQuery: false,
        });
        if (!branch) {
            return res.status(404).send("Branch not found");
        };
        logger.info("GetOneBranch by id");
    } catch (error) {
        logger.error(error.message);
        console.log(error);
    }
}

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
    createNewBranch,
    updateBranch,
    deleteBranch,
    getAllBranchs,
    getOneBranch,
    uploadImage
}
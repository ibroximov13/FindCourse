const logger = require("../config/log").child({model: "Branch"});
const { createBranchValidate, updateBranchValidate, branchByIdValidate } = require("../validation/branch.validate");

const createNewBranch = async (req, res) => {
    try {
        let {error, value} = createBranchValidate(req.body);
        if (error) {
            return res.status(422).send(error.details[0].message);
        }
        let {name, location, ...rest} = value;
        let branch = await Branch.findOne({
            where: {
                name: name,
                location: location
            }
        });

        if (!branch || branch == null || branch == undefined) {
            logger.warn(`Branch creation attempt failed: A branch with name "${name}" already exists at location "${location}". User ID: ${req.user.id}`);
            return res.status(400).send("There cannot be multiple branches with the same name in the same location.");
        }

        let newBranch = await Branch.create({
            ...rest,
            name,
            location
        });
        logger.info(`A new branch was created by ${req.user?.id || "an unknown user"}`);
        res.status(201).send(newBranch);
    } catch (error) {
        logger.error("Error!", error.message);
        console.log(error);
    }
};

const updateBranch = async (req, res) => {
    try {
        let {error: errorId, value: valueId} = branchByIdValidate(req.params);
        if (errorId) {
            return res.status(400).send(errorId.details[0].message);
        };
        let id = valueId.id;
        let {error, value} = updateBranchValidate(req.body);
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

        let updateData = {...branch.toJson(), ...value};

        res.send(updatedBranch)
    } catch (error) {
        logger.error("Error!", error.message);
        console.log(error);
    }
}
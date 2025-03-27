const logger = require("../config/log");
const { User } = require("../models");

const getAll = async (req, res) => {
    try {
        let user = req.user.id;
        let myself = User.findAll({
            where: {
                id: id
            },
            
        })
    } catch (error) {
        logger.error(error.message);
        console.log(error);
    }
}
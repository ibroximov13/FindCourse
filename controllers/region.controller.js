const Region = require("../models/region.model");

const getRegions = async (req, res) => {
    try {
        const regions = await Region.findAll({
            order: [['id', 'ASC']],
            raw: true,
            attributes: ['id', 'name']
        });
        res.status(200).json(regions);
    } catch (error) {
        console.error("Error fetching regions:", error);
        res.status(500).json({ error: "Failed to fetch regions" });
    }
};

module.exports = { getRegions };
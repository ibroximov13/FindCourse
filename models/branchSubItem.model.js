const { DataTypes } = require("sequelize");
const { db } = require("../config/db");

const BranchSubItem = db.define("branchSubItems", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    branchId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    subjectId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {timestamps: false});

module.exports = BranchSubItem;

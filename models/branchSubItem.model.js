const { DataTypes } = require("sequelize");
const { db } = require("../config/db");

const branchSubItem = db.define("branchSubItem", {
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
});

module.exports = branchSubItem;

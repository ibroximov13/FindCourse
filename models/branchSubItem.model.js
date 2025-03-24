const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const branchSubItem = sequelize.define("branchSubItem", {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    filialId: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    subjectId: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
});

module.exports = branchSubItem;

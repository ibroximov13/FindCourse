const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const branchCourseItem = sequelize.define("branchCourseItem", {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    filialId: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    courseId: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
});

module.exports = branchCourseItem;

const { DataTypes } = require("sequelize");
const { db } = require("../config/db");

const branchCourseItem = db.define("branchCourseItem", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    branchId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    courseId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
});

module.exports = branchCourseItem;

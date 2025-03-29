const { DataTypes } = require("sequelize");
const { db } = require("../config/db");

const BranchCourseItem = db.define("branchCourseItems", {
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
}, {timestamps: false});

module.exports = BranchCourseItem

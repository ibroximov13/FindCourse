const { DataTypes } = require("sequelize");
const { db } = require("../config/database");

const CourseItem = db.define("CourseItem", {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    centerId: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    courseId: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
});

module.exports = CourseItem;

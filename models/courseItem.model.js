const { DataTypes } = require("sequelize");
const {db} = require("../config/db");

const CourseItem = db.define("CourseItem", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    centerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    courseId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
});

module.exports = CourseItem;

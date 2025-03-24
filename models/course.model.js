const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Course = sequelize.define("Course", {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING
    },
});

module.exports = Course;


const { DataTypes } = require("sequelize");
const { db } = require("../config/database");

const Course = db.define("Course", {
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


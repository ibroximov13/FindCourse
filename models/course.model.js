const { DataTypes } = require("sequelize");
const {db} = require("../config/db");

const Course = db.define("Course", {
    id: {
        type: DataTypes.INTEGER,
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
}, {timestamps: false});

module.exports = Course;


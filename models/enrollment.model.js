const { DataTypes } = require("sequelize");
const {db} = require("../config/db");

const Enrollment = db.define("Enrollment", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    courseId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    centerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    subjectId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {timestamps: false});

module.exports = Enrollment;
const { DataTypes } = require("sequelize");
const {db} = require("../config/db");

const Enrollment = db.define("Enrollment", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    courseId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    centerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    subjectId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {timestamps: false});

module.exports = Enrollment;
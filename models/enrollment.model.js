const { DataTypes } = require("sequelize");
const { db } = require("../config/db");

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
        allowNull: true
    },
    centerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    subjectId: {
        type: DataTypes.INTEGER,
        allowNull: true 
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, { timestamps: false });

module.exports = Enrollment;
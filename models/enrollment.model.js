const { DataTypes } = require("sequelize");
const { db } = require("../config/database");

const Enrollment = db.define("Enrollment", {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    courseId: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    centerId: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    subjectId: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
});

module.exports = Enrollment;


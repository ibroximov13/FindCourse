const { DataTypes } = require("sequelize");
const { db } = require("../config/database");

const SubjectItem = db.define("SubjectItem", {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    subjectId: {
        type: DataTypes
            .BIGINT, allowNull: false
    },
    centerId: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
});

module.exports = SubjectItem;


const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const SubjectItem = sequelize.define("SubjectItem", {
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


const { DataTypes } = require("sequelize");
const {db} = require("../config/db");

const SubjectItem = db.define("SubjectItem", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    subjectId: {
        type: DataTypes.INTEGER, 
        allowNull: false
    },
    centerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
});

module.exports = SubjectItem;


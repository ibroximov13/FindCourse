const { DataTypes } = require("sequelize");
const { db } = require("../config/database");

const Subject = db.define("Subject", {
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

module.exports = Subject;


const { DataTypes } = require("sequelize");
const {db} = require("../config/db");

const Subject = db.define("Subject", {
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

module.exports = Subject;


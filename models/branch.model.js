const { DataTypes } = require("sequelize");
const {db} = require("../config/db");

const Branch = db.define("Branch", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    image: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    regionId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
});

module.exports = Branch;

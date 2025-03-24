const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Branch = sequelize.define("Branch", {
    id: {
        type: DataTypes.BIGINT,
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
        type: DataTypes.BIGINT,
        allowNull: false
    },
});

module.exports = Branch;

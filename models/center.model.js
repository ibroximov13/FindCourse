const { DataTypes } = require("sequelize");
const { db } = require("../config/database");

const Center = db.define("Center", {
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
    regionId: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.BIGINT,
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
    star: {
        type: DataTypes.INTEGER
    },
    filial: {
        type: DataTypes.BIGINT
    },
});

module.exports = Center;

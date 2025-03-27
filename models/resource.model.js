const { DataTypes } = require("sequelize");
const { db } = require("../config/db");

const Resource = db.define("Resource", {
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
    description: {
        type: DataTypes.TEXT

    },
    media: {
        type: DataTypes.STRING,
        allowNull: false

    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false

    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false

    },
}, {timestamps: false});

module.exports = Resource;

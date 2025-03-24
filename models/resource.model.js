const { DataTypes } = require("sequelize");
const { db } = require("../config/database");

const Resource = db.define("Resource", {
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
    description: {
        type: DataTypes.TEXT

    },
    media: {
        type: DataTypes.STRING,
        allowNull: false

    },
    userId: {
        type: DataTypes.BIGINT,
        allowNull: false

    },
    categoryId: {
        type: DataTypes.BIGINT,
        allowNull: false

    },
});

module.exports = Resource;

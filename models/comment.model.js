const { DataTypes } = require("sequelize");
const {db} = require("../config/db");

const Comment = db.define("comments", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ceneterId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    star: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {timestamps: false});

module.exports = Comment;
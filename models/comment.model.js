const { DataTypes } = require("sequelize");
const {db} = require("../config/db");

const Comment = db.define("comments", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    center_id: {
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
});

module.exports = Comment;
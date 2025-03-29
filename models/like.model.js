const { DataTypes } = require("sequelize");
const {db} = require("../config/db");

const Like = db.define("Like", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    centerId: {
        type: DataTypes.INTEGER,
        allowNull:
            false
    },
}, {timestamps: false});

module.exports = Like;
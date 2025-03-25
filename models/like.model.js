const { DataTypes } = require("sequelize");
const { db } = require("../config/database");

const Like = db.define("Like", {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    centerId: {
        type: DataTypes.BIGINT,
        allowNull:
            false
    },
});

module.exports = Like;

const { DataTypes } = require("sequelize");
const { db } = require("../config/db");

const Month = db.define("months", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
},
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
},
{
  tableName: "months",
    timestamps: false,
});



module.exports = Month;
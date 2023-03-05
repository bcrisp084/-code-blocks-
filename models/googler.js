const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/connection");

class Googler extends Model {}

Googler.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
    },
    googleId: {
      type: DataTypes.STRING,
    },
    thumbnail: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "googler",
  }
);

module.exports = Googler;

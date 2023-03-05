const sequelize = require("../config/connection");
const { DataTypes, Model } = require("sequelize");

class Cars extends Model {}
Cars.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    make: {
      type: DataTypes.STRING,
    },
    model: {
      type: DataTypes.STRING,
    },
    year: {
      type: DataTypes.INTEGER,
    },
    photo: {
      type: DataTypes.BLOB,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "cars",
  }
);
module.exports = Cars;

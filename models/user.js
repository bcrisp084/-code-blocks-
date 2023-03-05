const sequelize = require("../config/connection");
const { DataTypes, Model } = require("sequelize");
const bcrypt = require("bcrypt");

class User extends Model {
  passwordValidate(passPhrase) {
    return bcrypt.compareSync(passPhrase, this.password);
  }
}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 20],
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (userUsername) => {
        const lowerCaseUser = await userUsername.username.toLowerCase();
        return lowerCaseUser;
      },
      beforeCreate: async (newUserPass) => {
        newUserPass.password = await bcrypt.hash(newUserPass.password, 10);
        return newUserPass;
      },
      beforeUpdate: async (userUsername) => {
        const lowerCaseUser = await userUsername.username.toLowerCase();
        return lowerCaseUser;
      },
      beforeUpdate: async (updatePassword) => {
        updatePassword.password = await bcrypt.hash(
          updatePassword.password,
          10
        );
        return updatePassword;
      },
    },
    sequelize,
    modelName: "users",
    timestamps: false,
  }
);

module.exports = User;

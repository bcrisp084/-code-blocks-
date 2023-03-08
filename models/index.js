const User = require("./user");
const Images = require("./images");

User.hasMany(Images, {
  foreignKey: "user_id",
});

Images.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Images };

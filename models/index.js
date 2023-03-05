const User = require("./user");
const Cars = require("./cars");

User.hasMany(Cars, {
  foreignKey: "user_id",
});

Cars.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Cars };

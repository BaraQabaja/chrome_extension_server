const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("user", {
  email: {
    allowNull: false,
    requaired: true,
    type: Sequelize.STRING,
    primaryKey: true,
  },
  username: {
    allowNull: false,
    requaired: true,
    type: Sequelize.STRING,
    
    // primaryKey: true,
  },

  password: {
    type: Sequelize.STRING,
    allowNull: false,
    requaired: true,
    len: [8, 50],
  }
});
module.exports = User;

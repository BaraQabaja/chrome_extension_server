const Sequelize = require('sequelize');
//Database name: postgres  username:postgres    password:postgres 
const sequelize = new Sequelize('postgres', 'postgres', 'postgres', {
  dialect: 'postgres',
  host: 'localhost'
});

module.exports = sequelize;
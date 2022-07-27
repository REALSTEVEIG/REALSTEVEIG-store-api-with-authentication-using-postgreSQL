const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('authentication', 'postgres', process.env.POSTGRESS_PASSWORD, {
    host: 'localhost',
    dialect:  'postgres' 
  });

module.exports = sequelize
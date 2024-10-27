const { DataTypes } = require('sequelize');
const DB = require('../db.config');

const Family = DB.define('Family', {
  id: {
    type: DataTypes.INTEGER(10),
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, { paranoid: true });

module.exports = Family
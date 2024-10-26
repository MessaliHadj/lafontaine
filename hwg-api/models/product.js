const { DataTypes, Enum } = require('sequelize')
const DB = require('../db.config')

const Product = DB.define('Product', {
  id: {
    type: DataTypes.INTEGER(10),
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  firstname: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  role: {
    type: Enum(['Product', 'admin', 'manager']),
    defaultValue: 'Product',
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
}, {paranoid: true})

module.exports = Product
const { DataTypes, Enum } = require('sequelize')
const bcrypt = require('bcrypt')
const DB = require('../db.config')

const User = DB.define('User', {
  id: {
    type: DataTypes.INTEGER(10),
    primaryKey: true,
    autoIncrement: true
  },
  lastname: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  firstname: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  role: {
    type: Enum(['user', 'admin', 'manager']),
    defaultValue: 'user',
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
  password: {
    type: DataTypes.STRING(64),
    allowNull: false,
    set(value) {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(value, salt);
      this.setDataValue('passwordHash', hash);
    }
  }
}, {paranoid: true})

module.exports = User
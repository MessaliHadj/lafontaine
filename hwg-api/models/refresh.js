const { DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')
const DB = require('../db.config')

const Refresh = DB.define('Refresh', {
  id: {
    type: DataTypes.INTEGER(10),
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER(10),
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(value, salt);
      this.setDataValue('refreshToken', hash);
    }
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 jours en milliseconds
  }
})

module.exports = Refresh
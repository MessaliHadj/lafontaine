const { DataTypes } = require('sequelize')
const DB = require('../db.config')

const OrderProduct = DB.define('OrderProduct', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, { timestamps: false });

Oder.belongsToMany(Product, { through: OderProduct });
Product.belongsToMany(Oder, { through: OderProduct });

module.exports = OrderProduct
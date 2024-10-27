const { DataTypes, ENUM } = require('sequelize')
const OrderProduct = require('./order.product');
const DB = require('../db.config')

const Order = DB.define('Order', {
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
  status: {
    type: ENUM(['in progress', 'ready', 'recovered', 'cancelled']),
    defaultValue: 'in progress',
    allowNull: false
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0
  }
}, {
  paranoid: true,
  hooks: {
    beforeCreate: async (order) => {
      const orderProducts = await OrderProduct.findAll({ where: { orderId: order.id } });
      
      order.total = orderProducts.reduce((acc, orderProduct) => acc + orderProduct.prix_total, 0);
    },
    beforeUpdate: async (order) => {
      const orderProducts = await OrderProduct.findAll({ where: { orderId: order.id } });
      order.total = orderProducts.reduce((acc, orderProduct) => acc + orderProduct.prix_total, 0);
    }
  }
})

module.exports = Order
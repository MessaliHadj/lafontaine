const { DataTypes, Enum } = require('sequelize')
const DB = require('../db.config')

const Oder = DB.define('Oder', {
  id: {
    type: DataTypes.INTEGER(10),
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER(10),
    allowNull: false
  },
  status: {
    type: Enum(['in progress', 'ready', 'recovered']),
    defaultValue: 'in progress',
    allowNull: false
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
}, {
  paranoid: true,
  hooks: {
    beforeCreate: (order) => {
      order.total = order.Products.reduce((total, product) => {
        return total + product.price * product.OrderProduct.quantity;
      }, 0);
    }
  }
})

module.exports = Oder
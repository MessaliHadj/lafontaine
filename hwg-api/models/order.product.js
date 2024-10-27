const { DataTypes } = require('sequelize');
const DB = require('../db.config');

let cachedProductModel;
let cachedMenuModel;

function getModel(modelName) {
  if (modelName === 'Product') {
    if (!cachedProductModel) cachedProductModel = require('./product');
    return cachedProductModel;
  }
  if (modelName === 'Menu') {
    if (!cachedMenuModel) cachedMenuModel = require('./menu');
    return cachedMenuModel;
  }
}

async function setTotalPrice(orderProduct) {
  const Model = getModel(orderProduct.productId ? 'Product' : 'Menu');
  const productOrMenu = await Model.findByPk(orderProduct.productId || orderProduct.menuId);
  if (productOrMenu) {
    orderProduct.total = productOrMenu.price * orderProduct.quantity;
  } else {
    throw new Error(`${orderProduct.productId ? 'Product' : 'Menu'} not found`);
  }
}

const OrderProduct = DB.define('OrderProduct', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Orders',
      key: 'id'
    }
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  menuId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0
  }
}, {
  timestamps: false,
  validate: {
    productOrMenuOnly() {
      if ((this.productId && this.menuId) || (!this.productId && !this.menuId)) {
        throw new Error('Only one of productId or menuId should be set.');
      }
    }
  },
  hooks: {
    beforeCreate: async (orderProduct) => {
      try {
        await setTotalPrice(orderProduct);
      } catch (err) {
        console.error('Error setting total price:', err);
        throw err;
      }
    },
    beforeUpdate: async (orderProduct) => {
      try {
        await setTotalPrice(orderProduct);
      } catch (err) {
        console.error('Error setting total price:', err);
        throw err;
      }
    }
  }
});

// Définition de l'association dans une méthode externe
OrderProduct.associate = (models) => {
  OrderProduct.belongsTo(models.Order, { foreignKey: 'orderId' });
  OrderProduct.belongsTo(models.Product, { foreignKey: 'productId' });
  OrderProduct.belongsTo(models.Menu, { foreignKey: 'menuId' });
};

module.exports = OrderProduct;

const { DataTypes } = require('sequelize')
const Family = require('./family')
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
  familyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Family,
      key: 'id'
    }
  },
  description: {
    type: DataTypes.STRING(100),
    defaultValue: '',
    allowNull: true
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0
  },
}, {paranoid: true})

Product.belongsTo(Family, { foreignKey: 'familyId' });
Family.hasMany(Product, { foreignKey: 'familyId' });

module.exports = Product
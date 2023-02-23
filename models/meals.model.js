const { db } = require('../dataBase/db')
const { DataTypes } = require('sequelize')

const Meals = db.define('meals', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  restaurantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'active',
    enum: ['active', 'inactive'],
  },
})

module.exports = Meals

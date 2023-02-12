const { DataTypes } = require('sequelize')
const { db } = require('../dataBase/db')

const User = db.define('user', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },

  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'normal',
    enum: ['normal', 'admin'],
  },
})

module.exports = User

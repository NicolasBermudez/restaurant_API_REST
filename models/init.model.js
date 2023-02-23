const Meals = require('./meals.model')
const Orders = require('./order.model')
const Restaurants = require('./restaurants.model')
const Reviews = require('./reviews.model')
const User = require('./users.model')

const initModel = () => {
  Restaurants.hasMany(Reviews)
  Reviews.belongsTo(Restaurants)

  Restaurants.hasMany(Meals)
  Meals.belongsTo(Restaurants)

  Meals.hasOne(Orders)
  Orders.belongsTo(Meals)

  User.hasMany(Orders)
  Orders.belongsTo(User)

  User.hasMany(Reviews)
  Reviews.belongsTo(User)
}

module.exports = initModel

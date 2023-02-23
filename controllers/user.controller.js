const catchAsync = require('../utils/catchAsync')

const Meals = require('../models/meals.model')
const Orders = require('../models/order.model')
const Restaurants = require('../models/restaurants.model')

exports.updateUser = catchAsync(async (req, res, next) => {
  const { name, email } = req.body

  const { user } = req

  await user.update({ name, email })

  res.status(200).json({
    status: 'success',
    message: 'User updated successfully',
  })
})

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req

  await user.update({ status: false })

  res.status(200).json({
    status: 'success',
    message: 'User deleted successfully',
  })
})

exports.totalUserOrder = catchAsync(async (req, res, next) => {
  const { sessionUser } = req

  const allOrder = await Orders.findAll({
    where: {
      userId: sessionUser.id,
    },
    include: [
      {
        model: Meals,
        attributes: { exclude: ['createdAt', 'updatedAt', 'status'] },
        include: [
          {
            model: Restaurants,
            attributes: { exclude: ['createdAt', 'updatedAt', 'status'] },
          },
        ],
      },
    ],
  })

  res.status(200).json({
    status: 'success',
    message: 'all Order find successfully',
    allOrder,
  })
})

exports.userOrder = catchAsync(async (req, res, next) => {
  const { sessionUser } = req

  const { id } = req.params

  const order = await Orders.findOne({
    where: {
      id,
      userId: sessionUser.id,
    },
    include: [
      {
        model: Meals,
        attributes: { exclude: ['createdAt', 'updatedAt', 'status'] },
        include: [
          {
            model: Restaurants,
            attributes: { exclude: ['createdAt', 'updatedAt', 'status'] },
          },
        ],
      },
    ],
  })

  res.status(200).json({
    status: 'success',
    message: 'all Order find successfully',
    order,
  })
})

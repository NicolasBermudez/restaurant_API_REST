const catchAsync = require('../utils/catchAsync')

const Meals = require('../models/meals.model')
const Orders = require('../models/order.model')
const Restaurants = require('../models/restaurants.model')

exports.newOrder = catchAsync(async (req, res, next) => {
  const { quantity } = req.body

  const { meals, sessionUser } = req

  const order = await Orders.create({
    quantity,
    mealId: meals.id,
    userId: sessionUser.id,
    totalPrice: meals.price * quantity,
  })

  res.status(201).json({
    status: 'success',
    message: 'Order create successfully',
    order,
  })
})

exports.allOrderUser = catchAsync(async (req, res, next) => {
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

exports.completedOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params

  const order = await Orders.findOne({
    where: {
      id,
      status: 'active',
    },
  })

  await order.update({ status: 'completed' })

  res.status(200).json({
    status: 'success',
    message: 'Order completed successfully',
  })
})

exports.cancelledOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params

  const order = await Orders.findOne({
    where: {
      id,
      status: 'active',
    },
  })

  await order.update({ status: 'cancelled' })

  res.status(200).json({
    status: 'success',
    message: 'Order cancelled successfully',
  })
})

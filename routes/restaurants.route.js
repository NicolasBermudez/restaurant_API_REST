const { Router } = require('express')

const {
  createRestaurant,
  findAllRestaurants,
  findRestaurant,
  updateRestaurant,
  deleteRestaurant,
  newReview,
  updateReview,
  deleteReview,
} = require('../controllers/restaurants.controllers')
const {
  protect,
  protectAccountOwer,
} = require('../middlewares/auth.middleware')
const {
  createRestaurantValidation,
  createReviewValidation,
  updateReviewValidation,
  updateRestaurantValidation,
} = require('../middlewares/valitation.middleware')

const router = Router()

router.get('/', findAllRestaurants)

router.get('/:id', findRestaurant)

router.use(protect)

router.post('/', createRestaurantValidation, createRestaurant)

router.post('/reviews/:id', createReviewValidation, newReview)

router.patch('/reviews/:restaurantId/:id', updateReviewValidation, updateReview)

router.delete('/reviews/:restaurantId/:id', deleteReview)

router.patch('/:id', updateRestaurantValidation, updateRestaurant)

router.delete('/:id', deleteRestaurant)

module.exports = { restaurantsRouter: router }

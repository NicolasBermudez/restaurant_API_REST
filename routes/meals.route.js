const { Router } = require('express')

const {
  findAllMeals,
  disableMeals,
  updateMeals,
  findMeals,
  newMeals,
} = require('../controllers/meals.controller')
const { protect } = require('../middlewares/auth.middleware')
const { validExistMeals } = require('../middlewares/meals.middlewares')
const { validExistRestaurant } = require('../middlewares/restaurant.middleware')
const {
  createMealsValidation,
  updateMealsValidation,
} = require('../middlewares/valitation.middleware')

const router = Router()

router.get('/', findAllMeals)

router.get('/:id', validExistMeals, findMeals)

router.use(protect)

router.post('/:id', createMealsValidation, validExistRestaurant, newMeals)

router.patch('/:id', updateMealsValidation, validExistMeals, updateMeals)

router.delete('/:id', validExistMeals, disableMeals)

module.exports = { mealsRouter: router }

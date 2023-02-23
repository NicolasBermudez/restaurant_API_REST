const { check } = require('express-validator')

exports.createMealsValidation = [
  check('name', 'the name must be mandatory').not().isEmpty(),
  check('price', 'the price must be mandatory').not().isEmpty(),
  check('price', 'the price must be a correct format').isInt(),
]

exports.updateMealsValidation = [
  check('name', 'the name must be mandatory').not().isEmpty(),
  check('price', 'the price must be mandatory').not().isEmpty(),
  check('price', 'the price must be a correct format').isInt(),
]

exports.createOrderValidation = [
  check('quantity', 'the quantity must be mandatory').not().isEmpty(),
  check('quantity', 'the quantity must be format correct').isInt(),
  check('mealId', 'the mealId must be format correct').isInt(),
  check('mealId', 'the mealId must be mandatory').not().isEmpty(),
]

exports.createRestaurantValidation = [
  check('name', 'the name must be mandatory').not().isEmpty(),
  check('address', 'the address must be mandatory').not().isEmpty(),
  check('rating', 'the rating must be mandatory').not().isEmpty(),
  check('rating', 'the rating must be a correct format').isInt(),
]

exports.createReviewValidation = [
  check('comment', 'the commments must be mandatory').not().isEmpty(),
  check('rating', 'the rating must be a correct format').isInt(),
  check('rating', 'the rating must be mandatory').not().isEmpty(),
]

exports.updateReviewValidation = [
  check('comment', 'the commments must be mandatory').not().isEmpty(),
  check('rating', 'the rating must be a correct format').isInt(),
  check('rating', 'the rating must be mandatory').not().isEmpty(),
]

exports.updateRestaurantValidation = [
  check('name', 'the name must be mandatory').not().isEmpty(),
  check('address', 'the address must be mandatory').not().isEmpty(),
]

exports.signupValidation = [
  check('name', 'the name must be mandatory').not().isEmpty(),
  check('email', 'the email must be mandatory').not().isEmpty(),
  check('email', 'The email must be a correct format').isEmail(),
  check('password', 'the password must be mandatory').not().isEmpty(),
]

exports.loginValidation = [
  check('email', 'the email must be mandatory').not().isEmpty(),
  check('email', 'The email must be a correct format').not().isEmail(),
  check('password', 'the password must be mandatory').not().isEmpty(),
]

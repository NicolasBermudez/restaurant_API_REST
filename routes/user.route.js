const { Router } = require('express')

const { createUser, loginUser } = require('../controllers/auth.controller')
const {
  updateUser,
  deleteUser,
  totalUserOrder,
  userOrder,
} = require('../controllers/user.controller')
const {
  protect,
  protectAccountOwer,
} = require('../middlewares/auth.middleware')
const {
  validIfExistUserEmail,
  validIfExistUser,
} = require('../middlewares/user.middleware')
const {
  signupValidation,
  loginValidation,
} = require('../middlewares/valitation.middleware')

const router = Router()

router.post('/signup', signupValidation, validIfExistUserEmail, createUser)

router.post('/login', loginValidation, loginUser)

router.use(protect)

router.patch('/:id', validIfExistUser, protectAccountOwer, updateUser)

router.delete('/:id', validIfExistUser, protectAccountOwer, deleteUser)

router.get('/orders', totalUserOrder)

router.get('/orders/:id', userOrder)

module.exports = { usersRouter: router }

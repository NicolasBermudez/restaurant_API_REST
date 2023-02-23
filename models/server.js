// en scripts debug : ndb app.js
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const xss = require('xss-clean')
const hpp = require('hpp')

const AppError = require('../utils/appError')
const globalErrorHandler = require('../controllers/error.controller')

const { db } = require('../dataBase/db')
const initModel = require('./init.model')

const { usersRouter } = require('../routes/user.route')
const { restaurantsRouter } = require('../routes/restaurants.route')
const { orderRouter } = require('../routes/orders.route')
const { mealsRouter } = require('../routes/meals.route')

class Server {
  constructor() {
    this.app = express()

    this.port = process.env.PORT || 4000

    this.limiter = rateLimit({
      max: 1000,
      window: 60 * 60 * 1000,
      message: 'too many request from IP, please try again in an hour!',
    })

    this.paths = {
      user: '/api/v1/users',
      restaurants: '/api/v1/restaurants',
      order: '/api/v1/orders',
      meals: '/api/v1/meals',
    }

    this.database()

    this.middlewares()

    this.routes()
  }

  middlewares() {
    this.app.use(helmet())

    this.app.use(xss())

    this.app.use(hpp())

    if (process.env.NODE_ENV === 'development') {
      this.app.use(morgan('dev'))
    }

    this.app.use('/api/v1', this.limiter)

    this.app.use(cors())

    this.app.use(express.json())
  }

  routes() {
    this.app.use(this.paths.user, usersRouter)

    this.app.use(this.paths.restaurants, restaurantsRouter)

    this.app.use(this.paths.order, orderRouter)

    this.app.use(this.paths.meals, mealsRouter)

    this.app.all('*', (req, res, next) => {
      return next(
        new AppError(`can't find ${req.originalUrl} on this server`, 404)
      )
    })

    this.app.use(globalErrorHandler)
  }

  database() {
    db.authenticate()
      .then(() => console.log('Database authenticated'))
      .catch(error => console.log(error))

    initModel()

    db.sync()
      .then(() => console.log('Database synced'))
      .catch(err => console.log(err))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server is running on port', this.port)
    })
  }
}

// exportamos el servidor
module.exports = Server

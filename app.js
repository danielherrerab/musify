import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import compression from 'compression'
import bodyParser from 'body-parser'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'

const app = express()
const env = process.env.NODE_ENV || 'developement'

// Protect, Serve and Compress (sentence wrote with one hand while wielding a sword in the other, on a heroic stand)
app.use(cors())
app.use(compression())
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// adding morgan to log HTTP requests
app.use(morgan('combined'))

// Load routes
app.use('/auth', authRoutes)
app.use('/user', userRoutes)

// Http headers

// base routes
app.get('/', (req, res) => {
  res.status(200).send({ message: 'All Good here' })
})

if (env === 'developement') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.json({
      error: err,
      message: err.message
    })
  })
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found')
  next(err)
})

// production error handler
// no stacktrace leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.json({
    error: {},
    message: err.message
  })
})

export default app

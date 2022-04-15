import express from 'express'
import {
  signup,
  login
} from '../controllers/auth.js'

const api = express.Router()

api.post('/signup', signup)
api.post('/login', login)

export default api

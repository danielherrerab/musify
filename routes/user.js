import express from 'express'
import {
  getUser
} from '../controllers/user.js'
import { mdAuthenticated } from '../middleware/authenticated.js'

const api = express.Router()

api.get('/', mdAuthenticated, getUser)

export default api

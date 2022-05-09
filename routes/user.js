import express from 'express'
import {
  getUser,
  updateUser
} from '../controllers/user.js'
import { mdAuthenticated } from '../middleware/authenticated.js'

const api = express.Router()

api.get('/', mdAuthenticated, getUser)
api.put('/', mdAuthenticated, updateUser)

export default api

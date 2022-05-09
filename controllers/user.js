import Joi from 'joi'
import User from '../schemas/user.js'
import {
  passwordPattern,
  passwordEncrypt,
  passwordCompare
} from '../services/password.js'
import { createToken } from '../services/jwt.js'

// Joi objects for usage on input validations
const validators = {
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(64)
    .label('Name')
    .messages({
      'string.min': '{{#label}} must have at least 3 characters',
      'string.max': '{{#label}} cannot exceed 64 characters',
      'string.empty': '{{#label}} is required',
      'any.required': '{{#label}} is required'
    }),
  surname: Joi.string()
    .alphanum()
    .min(3)
    .max(64)
    .label('Surname')
    .messages({
      'string.min': '{{#label}} must have at least 3 characters',
      'string.max': '{{#label}} cannot exceed 64 characters',
      'string.empty': '{{#label}} is required',
      'any.required': '{{#label}} is required'
    }),
  password: Joi.string()
    // Una mayúscula, una minúscula, un número, entre 8 a 15 carácteres
    .pattern(passwordPattern)
    .label('Password')
    .messages({
      'string.pattern.base': '{{#label}} isn\'t valid',
      'string.empty': '{{#label}} is required',
      'any.required': '{{#label}} is required'
    }),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .messages({
      'string.email': '{{#label}} isn\'t valid',
      'string.empty': '{{#label}} is required',
      'any.required': '{{#label}} is required'
    })
}

export const getUser = (req, res) => {
  res.status(200).send({
    message: 'User get',
    params: req.query
  })
}

export const updateUser = (req, res) => {
  // Receive params
  console.info('req.query.id', req.query.id)
  console.info('typeof req.query.id', typeof req.query.id)
  // Case Scenario 1: Role Admin, no id received on query


  // Case Scenario 2: Role Admin, id received on query


  // Case Scenario 3: Role User, id ignored


  const userId = req.params.id
  const params = req.body
  // Create object for input validations
  const schema = Joi.object(validators)
  // validate inputs
  const { error, value: requestParams } = schema.validate(params)
  // return error if something is missing
  if (error) return res.status(200).send({ message: error.details[0].message, status: false })

  res.status(200).send({
    message: 'User get',
    requestParams,
    params: req.params,
    query: req.query.id,
    user: req.user,
    userId
  })
}

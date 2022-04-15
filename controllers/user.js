import bcrypt from 'bcrypt'
import Joi from 'joi'
import User from '../schemas/user.js'

const SALT_ROUNDS = 10

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
    })
    .required(),
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
    })
    .required(),
  anyPassword: Joi.string()
    .label('Password')
    .messages({
      'string.empty': '{{#label}} is required',
      'any.required': '{{#label}} is required'
    })
    .required(),
  password: Joi.string()
    // Una mayúscula, una minúscula, un número, entre 8 a 15 carácteres
    .pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}/m)
    .label('Password')
    .messages({
      'string.pattern.base': '{{#label}} isn\'t valid',
      'string.empty': '{{#label}} is required',
      'any.required': '{{#label}} is required'
    })
    .required(),
  confirm_password: Joi.any().equal(Joi.ref('password'))
    .required()
    .label('Confirm Password')
    .messages({ 'any.only': '{{#label}} does not match' }),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .messages({
      'string.email': '{{#label}} isn\'t valid',
      'string.empty': '{{#label}} is required',
      'any.required': '{{#label}} is required'
    })
    .required()
}

export const getUser = (req, res) => {
  res.status(200).send({
    message: 'User get'
  })
}

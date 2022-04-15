import bcrypt from 'bcrypt'
import Joi from 'joi'
import User from '../schemas/user.js'
import { createToken } from '../services/jwt.js'

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

export const signup = async (req, res) => {
  // Receive params
  const params = req.body
  // Create object for input validations
  const schema = Joi.object({
    name: validators.name,
    surname: validators.surname,
    password: validators.password,
    confirm_password: validators.confirm_password,
    email: validators.email
  })
  // validate inputs
  const { error, value: requestParams } = schema.validate(params)
  // return error if something is missing
  if (error) return res.status(200).send({ message: error.details[0].message, status: false })
  // we must check if user already exists
  const userExist = await User.findOne({ email: requestParams.email.toLowerCase() })
  // if user exists, must return response
  if (!!userExist === false) return res.status(201).send({ message: 'User already signed up', status: false })
  // Looks like user does not exist, we proceed
  const user = new User()
  user.name = requestParams.name
  user.surname = requestParams.surname
  user.email = requestParams.email.toLowerCase()
  user.role = 'ROLE_USER' // Set manually, so far
  user.image = 'null' // 'null' as string, beacuse type of image is string on UserSchema
  user.password = await bcrypt.hash(requestParams.password, SALT_ROUNDS)
  user.save((err, storedUser) => {
    if (err) return res.status(500).send({ message: 'An error has occurred during user creation' })
    // we create a new authentication token with user data
    const token = createToken(storedUser)
    res.status(201).send({ message: 'User created successfully', token, status: true })
  })
}

export const login = async (req, res) => {
  // Receive params
  const params = req.body
  // Create object for input validations
  const schema = Joi.object({
    email: validators.email,
    password: validators.anyPassword
  })
  // validate inputs
  const { error, value: requestParams } = schema.validate(params)
  // return error if something is missing
  if (error) return res.status(200).send({ message: error.details[0].message, status: false })
  // Query user using email
  const user = await User.findOne({ email: requestParams.email.toLowerCase() })
  // If user doesn't exist, return error response
  if (!!user === false) return res.status(400).send({ message: 'User doesn\'t exist', status: false })
  // We check if password is valid
  const validPassword = await bcrypt.compare(requestParams.password, user.password)
  // Password doesn't match, return error message
  if (validPassword === false) return res.status(400).send({ message: 'Invalid password', status: false })
  // we create a new authentication token with user data
  const token = createToken(user)
  res.status(200).json({ message: 'Successful login', token, status: true })
}

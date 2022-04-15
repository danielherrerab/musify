import jwt from 'jwt-simple'
import moment from 'moment'
import { JWT_DAYS_TO_EXPIRE, JWT_SECRET_SIGNATURE } from '../config.js'

export const createToken = (user) => {
  const payload = {
    sub: user._id,
    name: user.name,
    surname: user.surname,
    email: user.email,
    role: user.role,
    image: user.image,
    iat: moment().unix(),
    exp: moment().add(JWT_DAYS_TO_EXPIRE, 'days').unix()
  }
  return jwt.encode(payload, JWT_SECRET_SIGNATURE)
}

export const decodeToken = (token) => {
  const decode = {
    payload: false,
    message: ''
  }
  try {
    const payload = jwt.decode(token, JWT_SECRET_SIGNATURE)
    // Check validation date
    if (payload.exp <= moment().unix()) {
      decode.message = 'Authentication token expired'
      return decode
    }
    decode.payload = payload
    return decode
  } catch (e) {
    console.info('error', e)
    decode.message = e?.message || 'Invalid authentication token'
    return decode
  }
}

import { JWT_HEADER } from '../config.js'
import { decodeToken } from '../services/jwt.js'

export const mdAuthenticated = (req, res, next) => {
  // Check if token header have been sent on the request
  if (!!req.headers?.[JWT_HEADER] === false) return res.status(403).send({ message: 'User must be logged for this action' })
  // Trim token, for the flies *wink wink spanish joke*, we don't need extra blank spaces
  const token = req.headers[JWT_HEADER].trim()
  // Decode token, function return an object with the payload and a message. If payload is false, it means that token ain't valid
  const { payload, message } = decodeToken(token)
  // if token not valid, we return an error message
  if (payload === false) return res.status(403).send({ message })
  req.user = payload
  next()
}

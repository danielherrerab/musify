import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

export const passwordPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}/m

export const passwordEncrypt = async (password) => {
  return await bcrypt.hash(password, SALT_ROUNDS)
}

export const passwordCompare = async (inputPassword, storedPassword) => {
  return await bcrypt.compare(inputPassword, storedPassword)
}

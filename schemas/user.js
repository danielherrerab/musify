import mongoose from 'mongoose'
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: String,
  surname: String,
  email: String,
  password: String,
  role: String,
  image: String
})

export default mongoose.model('User', UserSchema)

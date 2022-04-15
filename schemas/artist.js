import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ArtistSchema = new Schema({
  name: String,
  description: String,
  image: String
})

export default mongoose.model('Artist', ArtistSchema)

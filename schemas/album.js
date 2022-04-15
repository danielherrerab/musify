import mongoose from 'mongoose'
const Schema = mongoose.Schema

const AlbumSchema = new Schema({
  title: String,
  description: String,
  year: Number,
  image: String,
  artist: { type: Schema.objectId, ref: 'Artist' }
})

export default mongoose.model('Album', AlbumSchema)

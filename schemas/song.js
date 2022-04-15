import mongoose from 'mongoose'
const Schema = mongoose.Schema

const SongSchema = new Schema({
  number: String,
  title: String,
  duration: String,
  file: String,
  album: { type: Schema.objectId, ref: 'Album' }
})

export default mongoose.model('Song', SongSchema)

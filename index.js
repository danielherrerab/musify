'use strict'

import mongoose from 'mongoose'
import app from './app.js'
const port = process.env.PORT || 8000

mongoose.connect('mongodb://localhost/musify', (err, res) => {
  if (err) throw err
  else {
    console.log('Connected successfully to database ')
    app.listen(port, () => {
      console.log(`Àpp started, listening to port ${port}, url http://localhost:${port}`)
    })
  }
})

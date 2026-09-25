import config from './../config.js'
import app from './express.js'
import mongoose from 'mongoose'

// Connection URL
mongoose.Promise = global.Promise
mongoose.connect(process.env.DATABASE_URL)
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${process.env.DATABASE_URL}`)
})

app.listen(config.port, (err) => {
  if (err) {
    console.log(err)
  }
  console.info('Server started on port %s.', config.port)
})

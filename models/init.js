//mongodbに接続する

const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const dbUrl = "mongodb://localhost/suyaa-express-db"

mongoose.connect(dbUrl)
  .then(() => {
    console.log('Successfully connected to database')
  })
  .catch(error => {
    //   If there was an error connecting to the database
    if (error) console.log('Error connecting to MongoDB database', error)
  });

module.exports = mongoose
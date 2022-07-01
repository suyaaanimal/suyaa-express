//mongodbに接続する
require('dotenv').config();

const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const dbUrl = process.env.MONGODB_URL

mongoose.connect(dbUrl)
  .then(() => {
    console.log('Successfully connected to database')
  })
  .catch(error => {
    //   If there was an error connecting to the database
    if (error) console.log('Error connecting to MongoDB database', error)
  });

module.exports = mongoose
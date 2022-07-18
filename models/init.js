//mongodbに接続する
require('dotenv').config();

const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const { NODE_ENV, MONGODB_URI } = process.env;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: NODE_ENV,
}).then(() => {
    console.log('Successfully connected to database')
  })
  .catch(error => {
    //   If there was an error connecting to the database
    if (error) console.log('Error connecting to MongoDB database', error)
  });

module.exports = mongoose
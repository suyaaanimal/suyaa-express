// mongodbに接続する
const mongoose = require('mongoose');

require('dotenv').config();

mongoose.Promise = global.Promise;
const { NODE_ENV, MONGODB_URI } = process.env;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: NODE_ENV,
}).then(() => {
  console.log('Successfully connected to database');
})
  .catch((err) => {
    //   If there was an error connecting to the database
    console.log('Error connecting to MongoDB database', err);
  });

module.exports = mongoose;

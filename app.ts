// mongodbに接続する

import passport from 'passport';
import express from 'express';
import bodyParser from 'body-parser';
import rateLimit from 'express-rate-limit';

import errorhandler from 'errorhandler';
import fitbitRoute from './routes/fitbit';
import authRoute from './routes/auth';

require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

if (process.env.NODE_ENV === 'development') {
  app.use(errorhandler());
}
// Set up rate limiter: maximum of five requests per minute
const limiter = rateLimit({
  windowMs: 60000, // 1 minute
  max: 5,
});
// apply rate limiter to all requests
app.use(limiter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/', authRoute);

app.use('/', fitbitRoute);
// app.get('/', require('./routes/testdata'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App started at http://localhost:${port}`);
});

export default app;

const express = require('express')
const passport = require('passport');
const bodyParser = require('body-parser');
const RateLimit = require('express-rate-limit');

const app = express()

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(passport.initialize());

// Set up rate limiter: maximum of five requests per minute
const limiter = RateLimit({
  windowMs: 60000, // 1 minute
  max: 5
});
// apply rate limiter to all requests
app.use(limiter);

app.use('/', require('./routes/auth'))
app.use('/', require('./routes/fitbit'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/testdata", (req, res) => {
  // テストデータ
  res.send({
    status: true,
    data: {
      totalScore: [
        // efficiency
        { dateTime: "2022-06-01", score: 20 },
        { dateTime: "2022-06-02", score: 20 },
        { dateTime: "2022-06-03", score: 20 },
        { dateTime: "2022-06-04", score: 20 },
        { dateTime: "2022-06-05", score: 20 },
        { dateTime: "2022-06-06", score: 20 },
        { dateTime: "2022-06-07", score: 20 },
      ],
      levels: [
        { dateTime: "2022-06-01 19:00", level: 3 },
        { dateTime: "2022-06-01 19:30", level: 1 },
        { dateTime: "2022-06-01 20:00", level: 1 },
        { dateTime: "2022-06-01 20:30", level: 2 },
        { dateTime: "2022-06-01 21:00", level: 2 },
        { dateTime: "2022-06-01 21:30", level: 3 },
        { dateTime: "2022-06-01 22:00", level: 0 },
        { dateTime: "2022-06-01 22:30", level: 2 },
        { dateTime: "2022-06-01 23:00", level: 3 },
        { dateTime: "2022-06-01 23:30", level: 1 },
        { dateTime: "2022-06-02 00:00", level: 0 },
        { dateTime: "2022-06-02 00:30", level: 1 },
        { dateTime: "2022-06-02 01:00", level: 0 },
        { dateTime: "2022-06-02 01:30", level: 2 },
        { dateTime: "2022-06-02 02:00", level: 3 },
        { dateTime: "2022-06-02 02:30", level: 3 },
        { dateTime: "2022-06-02 03:00", level: 3 },
        { dateTime: "2022-06-02 03:30", level: 1 },
        { dateTime: "2022-06-02 04:00", level: 3 },
        { dateTime: "2022-06-02 04:30", level: 3 },
        { dateTime: "2022-06-02 05:00", level: 3 },
        { dateTime: "2022-06-02 05:30", level: 1 },
        { dateTime: "2022-06-02 06:00", level: 1 },
        { dateTime: "2022-06-02 06:30", level: 1 },
        { dateTime: "2022-06-02 07:00", level: 3 },
        { dateTime: "2022-06-02 07:30", level: 1 },
        { dateTime: "2022-06-02 19:00", level: 3 },
        { dateTime: "2022-06-02 19:30", level: 2 },
        { dateTime: "2022-06-02 20:00", level: 3 },
        { dateTime: "2022-06-02 20:30", level: 3 },
        { dateTime: "2022-06-02 21:00", level: 1 },
        { dateTime: "2022-06-02 21:30", level: 2 },
        { dateTime: "2022-06-02 22:00", level: 3 },
        { dateTime: "2022-06-02 22:30", level: 3 },
        { dateTime: "2022-06-02 23:00", level: 2 },
        { dateTime: "2022-06-02 23:30", level: 1 },
        { dateTime: "2022-06-03 00:00", level: 3 },
        { dateTime: "2022-06-03 00:30", level: 1 },
        { dateTime: "2022-06-03 01:00", level: 3 },
        { dateTime: "2022-06-03 01:30", level: 1 },
        { dateTime: "2022-06-03 02:00", level: 3 },
        { dateTime: "2022-06-03 02:30", level: 3 },
        { dateTime: "2022-06-03 03:00", level: 1 },
        { dateTime: "2022-06-03 03:30", level: 0 },
        { dateTime: "2022-06-03 04:00", level: 1 },
        { dateTime: "2022-06-03 04:30", level: 1 },
        { dateTime: "2022-06-03 05:00", level: 3 },
        { dateTime: "2022-06-03 05:30", level: 3 },
        { dateTime: "2022-06-03 06:00", level: 2 },
        { dateTime: "2022-06-03 06:30", level: 1 },
        { dateTime: "2022-06-03 07:00", level: 1 },
        { dateTime: "2022-06-03 07:30", level: 1 },
        { dateTime: "2022-06-03 19:00", level: 3 },
        { dateTime: "2022-06-03 19:30", level: 3 },
        { dateTime: "2022-06-03 20:00", level: 3 },
        { dateTime: "2022-06-03 20:30", level: 2 },
        { dateTime: "2022-06-03 21:00", level: 0 },
        { dateTime: "2022-06-03 21:30", level: 3 },
        { dateTime: "2022-06-03 22:00", level: 2 },
        { dateTime: "2022-06-03 22:30", level: 3 },
        { dateTime: "2022-06-03 23:00", level: 2 },
        { dateTime: "2022-06-03 23:30", level: 2 },
        { dateTime: "2022-06-04 00:00", level: 1 },
        { dateTime: "2022-06-04 00:30", level: 3 },
        { dateTime: "2022-06-04 01:00", level: 1 },
        { dateTime: "2022-06-04 01:30", level: 1 },
        { dateTime: "2022-06-04 02:00", level: 1 },
        { dateTime: "2022-06-04 02:30", level: 0 },
        { dateTime: "2022-06-04 03:00", level: 0 },
        { dateTime: "2022-06-04 03:30", level: 1 },
        { dateTime: "2022-06-04 04:00", level: 2 },
        { dateTime: "2022-06-04 04:30", level: 1 },
        { dateTime: "2022-06-04 05:00", level: 3 },
        { dateTime: "2022-06-04 05:30", level: 1 },
        { dateTime: "2022-06-04 06:00", level: 1 },
        { dateTime: "2022-06-04 06:30", level: 2 },
        { dateTime: "2022-06-04 07:00", level: 3 },
        { dateTime: "2022-06-04 07:30", level: 0 },
        { dateTime: "2022-06-04 19:00", level: 1 },
        { dateTime: "2022-06-04 19:30", level: 1 },
        { dateTime: "2022-06-04 20:00", level: 3 },
        { dateTime: "2022-06-04 20:30", level: 2 },
        { dateTime: "2022-06-04 21:00", level: 1 },
        { dateTime: "2022-06-04 21:30", level: 1 },
        { dateTime: "2022-06-04 22:00", level: 1 },
        { dateTime: "2022-06-04 22:30", level: 3 },
        { dateTime: "2022-06-04 23:00", level: 1 },
        { dateTime: "2022-06-04 23:30", level: 3 },
        { dateTime: "2022-06-05 00:00", level: 3 },
        { dateTime: "2022-06-05 00:30", level: 2 },
        { dateTime: "2022-06-05 01:00", level: 0 },
        { dateTime: "2022-06-05 01:30", level: 3 },
        { dateTime: "2022-06-05 02:00", level: 1 },
        { dateTime: "2022-06-05 02:30", level: 2 },
        { dateTime: "2022-06-05 03:00", level: 0 },
        { dateTime: "2022-06-05 03:30", level: 2 },
        { dateTime: "2022-06-05 04:00", level: 3 },
        { dateTime: "2022-06-05 04:30", level: 1 },
        { dateTime: "2022-06-05 05:00", level: 2 },
        { dateTime: "2022-06-05 05:30", level: 0 },
        { dateTime: "2022-06-05 06:00", level: 1 },
        { dateTime: "2022-06-05 06:30", level: 1 },
        { dateTime: "2022-06-05 07:00", level: 3 },
        { dateTime: "2022-06-05 07:30", level: 3 },
        { dateTime: "2022-06-05 19:00", level: 1 },
        { dateTime: "2022-06-05 19:30", level: 2 },
        { dateTime: "2022-06-05 20:00", level: 1 },
        { dateTime: "2022-06-05 20:30", level: 1 },
        { dateTime: "2022-06-05 21:00", level: 2 },
        { dateTime: "2022-06-05 21:30", level: 0 },
        { dateTime: "2022-06-05 22:00", level: 1 },
        { dateTime: "2022-06-05 22:30", level: 3 },
        { dateTime: "2022-06-05 23:00", level: 1 },
        { dateTime: "2022-06-05 23:30", level: 3 },
        { dateTime: "2022-06-06 00:00", level: 3 },
        { dateTime: "2022-06-06 00:30", level: 2 },
        { dateTime: "2022-06-06 01:00", level: 2 },
        { dateTime: "2022-06-06 01:30", level: 3 },
        { dateTime: "2022-06-06 02:00", level: 3 },
        { dateTime: "2022-06-06 02:30", level: 3 },
        { dateTime: "2022-06-06 03:00", level: 0 },
        { dateTime: "2022-06-06 03:30", level: 1 },
        { dateTime: "2022-06-06 04:00", level: 2 },
        { dateTime: "2022-06-06 04:30", level: 3 },
        { dateTime: "2022-06-06 05:00", level: 3 },
        { dateTime: "2022-06-06 05:30", level: 0 },
        { dateTime: "2022-06-06 06:00", level: 1 },
        { dateTime: "2022-06-06 06:30", level: 2 },
        { dateTime: "2022-06-06 07:00", level: 2 },
        { dateTime: "2022-06-06 07:30", level: 2 },
        { dateTime: "2022-06-06 19:00", level: 2 },
        { dateTime: "2022-06-06 19:30", level: 1 },
        { dateTime: "2022-06-06 20:00", level: 2 },
        { dateTime: "2022-06-06 20:30", level: 3 },
        { dateTime: "2022-06-06 21:00", level: 3 },
        { dateTime: "2022-06-06 21:30", level: 1 },
        { dateTime: "2022-06-06 22:00", level: 3 },
        { dateTime: "2022-06-06 22:30", level: 3 },
        { dateTime: "2022-06-06 23:00", level: 3 },
        { dateTime: "2022-06-06 23:30", level: 1 },
        { dateTime: "2022-06-07 00:00", level: 2 },
        { dateTime: "2022-06-07 00:30", level: 3 },
        { dateTime: "2022-06-07 01:00", level: 2 },
        { dateTime: "2022-06-07 01:30", level: 1 },
        { dateTime: "2022-06-07 02:00", level: 3 },
        { dateTime: "2022-06-07 02:30", level: 2 },
        { dateTime: "2022-06-07 03:00", level: 3 },
        { dateTime: "2022-06-07 03:30", level: 3 },
        { dateTime: "2022-06-07 04:00", level: 3 },
        { dateTime: "2022-06-07 04:30", level: 2 },
        { dateTime: "2022-06-07 05:00", level: 3 },
        { dateTime: "2022-06-07 05:30", level: 2 },
        { dateTime: "2022-06-07 06:00", level: 3 },
        { dateTime: "2022-06-07 06:30", level: 3 },
        { dateTime: "2022-06-07 07:00", level: 2 },
        { dateTime: "2022-06-07 07:30", level: 3 },
      ],
    },
  });
});

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`App started at http://localhost:${port}`)
})


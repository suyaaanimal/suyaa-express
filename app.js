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
        { dateTime: "2022-06-29", score: 20 },
        { dateTime: "2022-06-30", score: 30 },
        { dateTime: "2022-07-01", score: 40 },
      ],
      levels: [
        { dateTime: "2022-06-29 23:00", level: 0 }, // level: wake
        { dateTime: "2022-06-29 23:30", level: 1 }, //level: rem
        { dateTime: "2022-06-30 01:00", level: 1 },
        { dateTime: "2022-06-30 01:30", level: 1 },
        { dateTime: "2022-06-30 02:00", level: 2 }, // level: light
        { dateTime: "2022-06-30 02:30", level: 2 },
        { dateTime: "2022-06-30 03:00", level: 2 },
        { dateTime: "2022-06-30 03:30", level: 3 }, // level: deep
        { dateTime: "2022-06-30 04:00", level: 2 },
        { dateTime: "2022-06-30 04:30", level: 1 },
        { dateTime: "2022-06-30 05:00", level: 2 },
        { dateTime: "2022-06-30 05:30", level: 3 },
        { dateTime: "2022-06-30 06:00", level: 2 },
        { dateTime: "2022-06-30 06:30", level: 2 },
        { dateTime: "2022-06-30 07:00", level: 1 },
        { dateTime: "2022-06-30 07:30", level: 0 },
        { dateTime: "2022-06-30 23:00", level: 0 }, // level: wake
        { dateTime: "2022-06-30 23:30", level: 1 }, //level: rem
        { dateTime: "2022-07-01 00:00", level: 1 },
      ],
    },
  });
});

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`App started at http://localhost:${port}`)
})

module.exports = app;
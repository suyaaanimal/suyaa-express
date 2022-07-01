const express = require('express')
const passport = require('passport');

const bodyParser = require('body-parser');

const app = express()

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(passport.initialize());

app.use('/', require('./routes/auth'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`App started at http://localhost:${port}`)
})

module.exports = app;
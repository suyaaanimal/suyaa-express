const express = require('express')
const passport = require('passport');
const mongoose = require('mongoose');

const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express()
const port = process.env.PORT || 3000

const dbUrl = "mongodb://localhost/suyaa-express-db"
mongoose.Promise = global.Promise;
mongoose.connect(dbUrl);

app.use(session({
    secret: "secret word",
    saveUninitialized: true,
    resave: true,
    store: MongoStore.create({
      mongoUrl: dbUrl,
    })
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/',  require('./routes/users'))

// app.use(function(req,res,next){
//     res.locals = {
//         user: req.user
//     };
//     next();
// });

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app;
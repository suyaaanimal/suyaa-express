var User = require('../models/users')
const express = require('express')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const router = express.Router()

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// https://knimon-software.github.io/www.passportjs.org/guide/

router.post('/signin',
  passport.authenticate('local'),
  function(req, res) {
    res.redirect('/');
});

router.post('/signup', function(req, res, next){
    User.register(
        new User({ username: req.body.username, password: req.body.password }),
        req.body.password,
        function(err, user){
            if (err) {
                return res.render('user/signup', {title: 'User Sign up Error', user: req.body, error: err});
            }
            var authenticate = User.authenticate();

            authenticate(req.body.username, req.body.password, function(err, result) {
                if(err) {
                    return res.render('user/signup', {title: 'User Sign up Error', user: req.body, error: err});
                }
                res.render('user/index',{title:'User Signed in', result: result});
            });
        }
    );
});

router.post('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});



module.exports = router


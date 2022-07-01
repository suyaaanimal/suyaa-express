const mongoose = require('./init')
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema ({
  walletAddress : ""
});

userSchema.plugin(passportLocalMongoose, {
  session: false // Disable sessions as we'll use JWTs
})

const User = mongoose.model('User', userSchema)
module.exports = User
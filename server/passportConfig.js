var passport = require('passport');
const User = require('./models/User');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');
const saltRounds = 10;


passport.use(
  new GoogleStrategy({
    clientID: process.env['GOOGLE_CLIENT_ID'],
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
    callbackURL: process.env['GOOGLE_CALLBACK_URL'],
    scope: ['profile'],
    
  },
  async (
    accessToken, 
    refreshToken, 
    profile, 
    done
    ) => {
      try {
        const user = await User.findOne({emailId: profile.id});
        if (!user) {
          console.error('User is not in the database')
          console.log(profile)
          return done(null, false, { message: 'Unauthorized user'});
        } 
        return done(null, user);
      } 
      catch(err) {

        console.log(err);
      }
    }
));



passport.use(new LocalStrategy(
  { 
    usernameField: 'email',
    passwordField: 'password',
  },
  function(email, password, done) {

    User.findOne(
      { email }, 
      function (err, user) {

        if (err) { return done(err); }
        if (!user) { return done(null, false, 'no such user'); }
        bcrypt.compare(
          password, 
          user.password,
          function (err, res) {
            if (err) { console.log(err) }
            if (res) { return done(null, user);}
            else { console.log(email, password); return done(null, false); }
          }
          )

    });
  }
));

passport.serializeUser((user, done) => {
  process.nextTick(function() {
    console.log('SERIALIZE');
    console.log(user._id);
    done(null, user._id);
  })

});

passport.deserializeUser((id, done) => {
  process.nextTick(function() {
    console.log('DESERIALIZE');
    console.log(id);
    // User.findById(id, (err, user) => done(err, user))
    return done(null, id)
  })
});
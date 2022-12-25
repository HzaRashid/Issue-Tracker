var express = require('express')
var passport = require('passport');
var router = express.Router();
const User = require('../../models/User');
// http://localhost:4000/auth/google/


  // login page
  router.get('/', passport.authenticate('google'));


  // callback, redirects user to login page if not authenticated
  router.get('/callback',
    passport.authenticate('google', { failureRedirect: '/bar' }),
    (req, res) => {
      if (req.isAuthenticated()) {
        console.log('IS AUTHED')
        console.log(req.user)
        res.redirect(process.env['CLIENT_URL']);
      }

    }
  );


  router.post('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  }, []);
  
  module.exports = router;
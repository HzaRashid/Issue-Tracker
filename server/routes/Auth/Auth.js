const express = require('express');
var router = express.Router();
const User = require('../../models/User');
var passport = require('passport')
// const DemoUsers = require('./Issue-Tracker.users copy.json');
// const { default: mongoose } = require('mongoose');
router.use('/google', require('./GoogleAuth'))


router.get('/', (req, res) => {
    if (req.user) {
        res.status(200).json({
        authenticated: true,
        user: req.user
        })
        console.log(req)

        return;
    }
    res.status(400).json({
        authenticated: false,
        message: 'user not authenticated',
        req
    })
    
})


router.post('/login', function(req, res, next) {

  passport.authenticate('local', function(err, user, info) {
  
    if (err) return next(err);
    if (!user) return res.status(400).send(
      { authenticated: false, message: 'authentication unsuccessful' }
      )
    req.login(user, lgnErr => {
      if (lgnErr) return next(lgnErr);
      return res.status(200).send({
        authenticated: true,
        user: user
      })
    })
  })(req, res, next);
});


router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { 
      console.log(err);
      return next(err); 
      
    }
    res.redirect(process.env.CLIENT_URL_LOGIN);
  });
});


  
module.exports = router
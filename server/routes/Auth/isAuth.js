const express = require('express');
var router = express.Router();
const User = require('../../models/User');
var passport = require('passport')

const isAuthDemo = (req, res, next) => {
  // console.log(req?.session)
  // console.log(req?.isAuthenticated())
  // console.log(req?.user)
  if (req.user === process.env.DEMO_USER_ID) {
    console.log('Demo user - not permitted to make changes')
    return res.status(400).json({
      message: 'Demo user not authorized to make changes',
      statusText: 'Unauthorized account'
    })
  }
    if (!req.isAuthenticated()) {
      return res.status(400).json({
        message: 'user not authenticated'
      })
    } next()
}


const isAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(400).json({
      message: 'user not authenticated, nor authorized to make changes'
    })
  } next()
}

  module.exports = { isAuthDemo, isAuth }
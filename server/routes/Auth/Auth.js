const express = require('express');
var router = express.Router()


router.use('/google', require('./GoogleAuth'))


router.get('/', (req, res) => {
    if (req.user) {
        res.status(200).json({
        authenticated: true,
        user: req.user
        })
        console.log(req.user)
        return;
    }
    res.status(400).json({
        authenticated: false,
        message: 'user not authenticated'
    })
    
})
module.exports = router
const express = require('express');
const router = express.Router();
router.use(express.json());
const { 
    sendComments,
    getComments,
    writeComment
    
} = require('../controllers/CommentCtrl')
const { isAuthDemo, isAuth } = require('../routes/Auth/isAuth')


router.get('/SSE/:id', isAuth, sendComments);
router.post('/', isAuthDemo, writeComment);


module.exports = router;
const express = require('express');
const router = express.Router();
router.use(express.json());
const { 
    sendComments,
    getComments,
    writeComment
    
} = require('../controllers/CommentCtrl')
module.exports = router;


router.get('/SSE/:id', sendComments);
router.post('/', writeComment);

const e = require('express');
const Comment = require('../models/Comment');


const sendComments = (req, res) => {
    res.writeHead(
        200, {
        'Content-Type'  : 'text/event-stream',
        'Cache-Control' : 'no-cache',
        'Connection'    : 'keep-alive'
    },
        getComments( res ) 
    )
}

let getComments = async ( res ) => {
    Comment.find({}, 
        (err, result) => {
            if (err) {
                res.json(err)
            } 
            else {
                res.write(
                    'data: ' + 
                    JSON.stringify({ msg: result }) + 
                    '\n\n' 
                    ) 
            }
        })
        setTimeout(() => getComments( res ), 750)
    };


const writeComment = async (req, res) => {
        try { 
            const CommentFields = req.body;
            await Comment.create(CommentFields);
            res.json(CommentFields);
        } 
        catch (err) {
            console.log(err.message)
            res.status(500).send(err)
        }
            
    };  




module.exports = {
        sendComments,
        getComments, 
        writeComment 

    }
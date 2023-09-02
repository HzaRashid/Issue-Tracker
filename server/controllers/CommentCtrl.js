const e = require('express');
const Comment = require('../models/Comment');
const mongoose = require('mongoose')


const sendComments = (req, res) => {
    

    res.writeHead(
        200, {
        'Content-Type'  : 'text/event-stream',
        'Cache-Control' : 'no-cache',
        'Connection'    : 'keep-alive'
    });

    const id = req.params.id;
    const ObjectID = mongoose.Types.ObjectId;
    if ( ObjectID.isValid(id) ) {
        if ( ObjectID(id).toString() === id ) {
            
            writeData(res, id)
            setInterval(() => {
                writeData(res, id)
            }, 2000)
        
        
        }
    }
}

let writeData = async (res, id) => {
    try {
        let docs = await Comment.find( { issue: id } );
        res.write(`data: ${JSON.stringify(docs)}\n\n`);
    } 
    catch (error) {
       console.log(err) 
    }
}



// const sendComments = (req, res) => {
//     res.writeHead(
//         200, {
//         'Content-Type'  : 'text/event-stream',
//         'Cache-Control' : 'no-cache',
//         'Connection'    : 'keep-alive'
//     },
//         getComments( res ) 
//     )
// }

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
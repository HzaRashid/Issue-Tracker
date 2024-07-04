const e = require('express');
const Issue = require('../models/Issue')
const IssueVersion = require('../models/IssueVersion')
const Sprint = require('../models/Sprint')
const User = require('../models/User')
const { StageIssues } = require('./BoardIssues');
const { default: mongoose } = require('mongoose');


const sendIssueVersions = async (req, res) => {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        });

        const id = req.params.id
        const ObjectID = mongoose.Types.ObjectId;
        if ( ObjectID.isValid(id) ) {
            if ( ObjectID(id).toString() === id ) {
                
                writeData(res, id)
                var timer = setInterval(() => {
                    writeData(res, id)
                }, 2000)
            }
            res.on('close', function() {
                clearInterval(timer)
            })
        }
}
    
let writeData = async (res, id) => {
    try { 
        let docs = await IssueVersion.find({issueID: id})
        res.write(`data: ${JSON.stringify(docs)}\n\n`)
        res.flush()
    } 
    catch (err) {
        console.log(err)
    }
}
let getIssueVersionsFeed = async ( res, id ) => {
    // console.log(req.body)
    IssueVersion.find({issueID: id}, 
        (err, result) => {
            if (err) {
                res.json(err)
            } 
            else {
                res.write(
                    'data: ' + 
                    JSON.stringify(result) + 
                    '\n\n' 
                    ) 
            }
        })
        setTimeout(() => getIssueVersionsFeed( res, id ), 2000)
    };


const getIssueVersions = (req, res) => {
    IssueVersion.find({issueID: req.params.id}, 
        (err, result) => {
            if (err) {
                res.json(err)
            } 
            else {
                res.json(result) 
            }
        }).lean()
};


module.exports = {
    getIssueVersions,
    sendIssueVersions
    
}
const e = require('express');
const Issue = require('../models/Issue')
const IssueVersion = require('../models/IssueVersion')
const Sprint = require('../models/Sprint')
const User = require('../models/User')
const { StageIssues } = require('./BoardIssues');
const { default: mongoose } = require('mongoose');

const sendIssueVersions = (req, res) => {
    res.writeHead(
        200, {
        'Content-Type'  : 'text/event-stream',
        'Cache-Control' : 'no-cache',
        'Connection'    : 'keep-alive'
    },
        getIssueVersions( res ) 
    )
}
    
let getIssueVersions = async ( res ) => {
    IssueVersion.find({}, 
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
        setTimeout(() => getIssueVersions( res ), 750)
    };


module.exports = {
    getIssueVersions,
    sendIssueVersions
    
}
const mongoose = require('mongoose');

const summarySpecs = {
    type: String,
    required: true,
    maxLength: 100
}


const specs = {
    type: String,
    required: true
}

const typeStringOnly = { type: String }

const IssueVersionSchema = new mongoose.Schema({
    
    Version: {
        issueID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'issues'
        },
        ID: Number
    },

    summary: summarySpecs,

    ModSummary: typeStringOnly,

    NewSummary: typeStringOnly,

    type: specs,

    createdBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users'  
        },
        
    assignedTo: 
        {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users'
        }
    ,

    project: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'projects',
        required: true,
    },
    sprint: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'sprint'
    },

    stage: specs,

    dateOfUpdate: {
        type: Date,
        immutable: true,
        default: () => Date(), 
    },

});

module.exports = mongoose.model('issue_versions', IssueVersionSchema)
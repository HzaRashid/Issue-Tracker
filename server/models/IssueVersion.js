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
    
    // unique _id of issue that is modified
    issueID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'issues'
    },

    wasModified:    Boolean,         // true only when issue is modified
    modifiedField:  typeStringOnly,  // which field was modified (e.g., type, summary, stage..)
    newType:        typeStringOnly,  // the new type
    newSummary:     typeStringOnly,  // the new summary
    newAssignee:    typeStringOnly,  // ...
    newSprint:      typeStringOnly,
    newStage:       typeStringOnly,

    // the user who modified the issue
    modifiedBy:     {                
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users' 
    },
    dateOfUpdate: {
        type: Date,
        immutable: true,
        default: () => Date(), 
    },

    // the constructors below are for the old issue data, without the modification
    summary: summarySpecs,
    type: specs,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users'  
        },
    assignedTo: 
        {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users'
        },
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

});

module.exports = mongoose.model('issue_versions', IssueVersionSchema)
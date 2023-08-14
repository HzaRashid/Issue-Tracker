const mongoose = require('mongoose');

const summarySpecs = {
    type: String,
    required: true,
    maxLength: 100
}

// for email and password
const specs = {
    type: String,
    required: true
}

  

const IssueSchema = new mongoose.Schema({
    summary: summarySpecs,
    
    // types: bug, update/improvement, task, new feature
    type: specs,

    createdBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users',
        required: true
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

    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date(), 
    },

    listIndex: Number,
    
}, 
// { discriminatorKey: 'kind' }
)
;

// const Issue = mongoose.model('issues', IssueSchema)

// const backlogIssue = Issue.discriminator('backlogIssue', new mongoose.Schema({
//     sprint: String
// }))

// const sprintIssue = Issue.discriminator('sprintIssue', new mongoose.Schema({
//     sprint: {
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'sprint'
//     },
// }))

module.exports = mongoose.model('issues', IssueSchema);

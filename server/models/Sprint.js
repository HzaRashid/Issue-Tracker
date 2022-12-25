const mongoose = require('mongoose');

// for email and password
const specs = {
    type: String,
    required: true,
}

const dateSpecs = {
    type: Date,
    default: () => Date() 
    
}

const SprintSchema = new mongoose.Schema({
    title: specs,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users'  
        },

    project: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'projects',
        required: true,
    },

    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date(), 
        
    },
    startDate: dateSpecs,
    endDate: dateSpecs,

    stages: {
        type: Array,
        default: [
            {
                title: 'to do',
                issue_limit: 1000
            },
            {
                title: 'in progress',
                issue_limit: 1000
            },
            {
                title: 'complete',
                issue_limit: 1000
            }
        ]
    }
});

module.exports = mongoose.model('sprints', SprintSchema)
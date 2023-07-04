const mongoose = require('mongoose');

// for email and password
const specs = {
    type: String,
    required: true
}

const titleSpecs = {
    type: String,
    required: true,
    unique: true,
    maxLength: 30
}

const dateSpecs = {
    type: Date,
    default: () => Date() 
    
}

const ProjectSchema = new mongoose.Schema({

    title: titleSpecs,

    createdBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users'  
        },

    projectLead:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users'  
        },
    
    assignedTo: [
        {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users'  
        }
    ],

    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date(), 
        
    },

    startDate: dateSpecs,
    endDate: dateSpecs,

    issueTypes: {
        type: Array,
        default: ['Task', 'Bug', 'Feature']
    }
    
});

module.exports = mongoose.model('projects', ProjectSchema)
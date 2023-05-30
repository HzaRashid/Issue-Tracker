const mongoose = require('mongoose');

const commentSpecs = {    
    type: String,
    required: true,
    maxLength: 100
}
const CommentSchema = new mongoose.Schema({
    comment: commentSpecs,

    createdBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users'  
        },


    issue: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'issues'
    },

    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date(), 
    },
});

module.exports = mongoose.model('comments', CommentSchema)
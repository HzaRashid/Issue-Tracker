const mongoose = require('mongoose');
var isEmail = require('validator/lib/isEmail')

const specs = {
    type: String,
    required: true
}

const UserSchema = new mongoose.Schema({
    firstName: specs,
    lastName: specs,
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [isEmail, 'invalid email'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'invalid email']
    },
    emailId: String,
    password: specs,
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date(), 
        
    },
    updatedAt: {
        type: Date,
        default: () => Date(), 
    },
    role: {
        type: String,
        required: true
    },
    projects:  [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'projects'  
        }],
    
});

module.exports = mongoose.model('users', UserSchema)

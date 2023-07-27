const mongoose = require('mongoose');

// for email and password
const specs = {
    type: String,
    required: true
}

const UserSchema = new mongoose.Schema({
    firstName: specs,
    lastName: specs,
    email: { 
        type: String,
        required: true,
        unique: true,
        lowercase: true,
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

});

module.exports = mongoose.model('users', UserSchema)

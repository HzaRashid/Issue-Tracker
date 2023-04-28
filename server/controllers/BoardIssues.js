const e = require('express');
const Issues = require('../models/Issue')

// Linked list
class StageIssues {
    constructor(stage) {
        this.issues;
        this.stage = stage;
        return this.issues
    }

    async init() {

        try {
            const issuesPromise = await Issues.find({ stage: `/^${this.stage}$/i` });
            const issues = issuesPromise?.filter(issue => issue._id)
            this.issues = issues;
            return { issues };
            
        } catch (error) {
            console.log(error)
        } 
    }


    async insert() {

    }


    async delete() {

    }    
    
    
    async return() {
        
    }
}

module.exports = {
    StageIssues
}
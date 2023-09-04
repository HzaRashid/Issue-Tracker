const e = require('express');
const Sprint = require('../models/Sprint')

const getSprints = (req, res) => {
    Sprint.find({}, 
        (err, result) => {
            if (err) {
                res.json(err)
            } 
            else {
                res.status(200).json(result) 
            }
        })
    };


const addSprint = async (req, res, next) => {
    try { 
        const sprintFields = req.body;
        const sprintFamily = await Sprint.find({ project: sprintFields.project });
        const titleConflict = sprintFamily.filter(s => s.title === sprintFields.title)?.length;
        if ( titleConflict ) {
            res.status(555).send('No two sprints in the same project can have the same title')
        }
        const newSprint = await Sprint.create(sprintFields);
        req.body.SprintID = newSprint._id
        next();
    } 
    catch (error) {
        console.log(e.message)
        res.status(500).send(error)
    }
        
    };


const editSprintTitle = async (req, res) => {
    const sprintFields = req.body;
    Sprint.findById(
        sprintFields._id, 
        (err, doc) => {
        if (err) {
            console.log(err)
            res.status(400).send("Request failed")
        }
        doc.title = sprintFields.title;
        doc.updatedAt = Date();
        doc.save();
        res.status(200).send(sprintFields.title)
        });
    };

const editSprintTitleNext = async (req, res, next) => {
    const sprintFields = req.body;
    Sprint.findById(
        sprintFields._id, 
        (err, doc) => {
        if (err) {
            console.log(err)
            res.status(400).send("Request failed")
        }
        doc.title = sprintFields.title;
        doc.updatedAt = Date();
        doc.save();
        next()
        });
    };


const GeneralEdit = async (req, res) => {
    const fields = req.body;
    Sprint.findById(
        fields.sprintID, 
        (err, doc) => {
        if (err) {
            console.log(err)
            res.status(400).send("Request failed")
        }
        if (!doc) return res.status(500).send('Sprint not found')
        if (fields.title)     doc.title       = fields.title
        if (fields.startDate) doc.startDate   = fields.startDate;
        if (fields.endDate)   doc.endDate     = fields.endDate;
        doc.updatedAt = Date();
        doc.save();
        res.status(200).json(doc)
        });
};


const editSprintStartDate = async (req, res) => {
    const sprintFields = req.body;
    Sprint.findById(
        sprintFields._id, 
        (err, doc) => {
        if (err) {
            console.log(err)
            res.status(400).send("Request failed")
        }
        doc.startDate = sprintFields.startDate;
        doc.updatedAt = Date();
        doc.save();
        res.status(200).send(sprintFields.startDate)
      });
};


const editSprintStartDateNext = async (req, res) => {
    const sprintFields = req.body;
    Sprint.findById(
        sprintFields._id, 
        (err, doc) => {
        if (err) {
            console.log(err)
            res.status(400).send("Request failed")
        }
        doc.startDate = sprintFields.startDate;
        doc.updatedAt = Date();
        doc.save();
        next()
      });
};


const editSprintEndDate = async (req, res) => {
    const sprintFields = req.body;
    Sprint.findById(
        sprintFields._id, 
        (err, doc) => {
        if (err) {
            console.log(err)
            res.status(400).send("Request failed")
        }
        if (sprintFields.endDate) {
            doc.endDate = sprintFields.endDate;
            doc.updatedAt = Date();
            doc.save();
        }
        res.status(200).send(sprintFields.endDate)
        });
};



const editSprintType = async (req, res) => {
    const sprintFields = req.body;
    Sprint.findById(
        sprintFields._id, 
        (err, doc) => {
        if (err) {
            console.log(err)
            res.status(400).send("Request failed")
        }
        doc.type = sprintFields.type;
        doc.updatedAt = Date();
        doc.save();
        res.status(200).send(sprintFields.type)
        });
    };


const editSprintDesc = async (req, res) => {
    const sprintFields = req.body;
    Sprint.findById(
        sprintFields._id, 
        (err, doc) => {
        if (err) {
            console.log(err)
            res.status(400).send("Request failed")
        }
        doc.description = sprintFields.description;
        doc.updatedAt = Date();
        doc.save();
        res.status(200).send(sprintFields.description)
        });
    };


const deleteSprintStage = (req, res) => {
    const Fields = req.body;
    console.log(Fields)
    Sprint.findById(
        Fields.sprintID,
        (err, doc) => {
            if (err) {
                console.log(err);
                res.status(500).send(err)
            } else {
                const deleteStageTitle = Fields.deleteStage?.title.toLowerCase()
                const stages = doc?.stages
                const index = stages?.findIndex(
                    (stage => stage.title.toLowerCase() === deleteStageTitle)
                    )
                if (index > -1) {
                    stages?.splice(index, 1)
                }
                doc.stages = stages
                doc.updatedAt = Date();
                doc.save();
                res.status(200).send(Fields)
            }
        }

    )
}

const editSprintStageTitle = (req, res, next) => {
    const Fields = req.body;
    console.log(Fields)
    
    Sprint.findById(
        Fields.sprintID,
        (err, doc) => {
        if (err) {
            console.log(err)
            res.status(500)
        } else {
            // console.log(doc)

            const newTitle = Fields.newStageTitle.toLowerCase();
            const oldTitle = Fields.oldStageTitle?.toLowerCase();

            const stageTitles = doc?.stages.map(s => s.title?.toLowerCase());

            if (newTitle === oldTitle) {
                res.status(400).json(
                    {message: 'stage title already in use'}
                    );
                return;
            }
            else if (stageTitles.indexOf(newTitle) > -1) {
                res.status(401).json(
                    {message: 'stage title must be unique'}
                    );
                return;
            }
            else if (!(newTitle.replace(/\s/g, '').length > 0)) {
                res.status(402).json(
                    {message: 'stage title cannot be empty'}
                    );
                return;
            }
            
            
            let stages = doc?.stages;
            const index = stages?.findIndex(
                (stage => stage?.title?.toLowerCase() === oldTitle)
            );
            stages[index].title = newTitle;
            doc.stages = stages;
            console.log(doc);
            doc.markModified('stages');
            doc.save();
            next()
        }
    })
}

const editSprintStageIssueLimit = (req, res) => {
    const Fields = req.body;
    console.log(Fields)
    
    Sprint.findById(
        Fields.sprintID,
        (err, doc) => {
        if (err) {
            console.log(err)
            res.status(500)
        } else {

            const newLimit = Fields.newLimit;
            const stageTitle = Fields.stageTitle.toLowerCase()

            if (newLimit < 0 || newLimit > 1000) {
                res.status(400).send('new issue limit must be between 0 and 1000');
                return;
            }
            else if (newLimit && isNaN(newLimit)) {
                res.status(401).send('new issue limit must be a number between 0 and 1000');
                return;
            }

            let stages = doc?.stages;
            const index = stages?.findIndex(
                (stage => stage?.title?.toLowerCase() === stageTitle)
            );
            stages[index].issue_limit = newLimit;
            doc.stages = stages;
            console.log(doc);
            doc.markModified('stages');
            doc.save();
            res.status(200).send(doc)
        }
    })
}

const addSprintStage = (req, res) => {
    const Fields = req.body;
    console.log(Fields)
    
    Sprint.findById(
        Fields.sprintID,
        (err, doc) => {
        if (err) {
            console.log(err)
            res.status(500)
        } 
        const stageTitle = Fields.stageTitle.toLowerCase();
        const stageTitleList = doc?.stages.map(s => s.title?.toLowerCase());

        if (stageTitleList.indexOf(stageTitle) > -1) {
            res.status(401).json(
                {message: 'stage title must be unique'}
                );
            return;
        }
        else if (!(stageTitle.replace(/\s/g, '').length > 0)) {
            res.status(402).json(
                {message: 'stage title cannot be empty'}
                );
            return;
        }
        
        let stages = doc?.stages;
        stages.push(
            {
                title: Fields.stageTitle,
                issue_limit: Infinity
            }
        )
        doc.stages = stages;
        doc.markModified('stages');
        doc.save();
        res.status(200).send(doc)

    })
}


const deleteSprint = (req, res, next) => {
    const sprintFields = req.body;
    req.body.SprintID = req.body._id
    req.body.IssueIDList = req.body.issues;
    req.body.ProjectID = req.body.ProjectID
    req.body.UserIDList = req.body.assignedTo
    Sprint.findByIdAndDelete(
        sprintFields._id,
        (err, doc) => {
            if (err) {
                console.log(err);
                res.status(500).send("Request failed");
            }
            next();
        }
        )
    };
    

module.exports = {
    getSprints, 
    addSprint, 
    editSprintTitle,
    editSprintTitleNext,
    editSprintStartDate, 
    editSprintStartDateNext,
    editSprintEndDate,
    addSprintStage,
    deleteSprintStage,
    editSprintStageTitle,
    editSprintStageIssueLimit,
    deleteSprint,
    GeneralEdit
}
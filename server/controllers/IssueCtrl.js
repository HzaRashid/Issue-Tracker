const e = require('express');
const Issue = require('../models/Issue')
const IssueVersion = require('../models/IssueVersion')
const Sprint = require('../models/Sprint')
const User = require('../models/User')
const { StageIssues } = require('./BoardIssues');
const { default: mongoose } = require('mongoose');

const getIssues = (req, res) => {
    Issue.find({}, 
        (err, result) => {
            if (err) {
                res.json(err)
            } 
            else {
                res.json(result) 
            }
        })
    };

// const getIssueVersions = (req, res) => {
//     IssueVersion.find({}, 
//         (err, result) => {
//             if (err) {
//                 res.json(err)
//             } 
//             else {
//                 res.json(result) 
//             }
//         })
//     };






const addIssue = async (req, res) => {
    try { 
        const issueFields = req.body;
        const newIssue = await Issue.create(issueFields);
        req.body.IssueID = newIssue._id;
        req.body.UserID = newIssue.assignedTo;
        res.json(newIssue).status(200).end();
    } 
    catch (err) {
        console.log(err.message)
        res.status(500).send(err)
    }
        
};


const editIssueSummary = async (req, res) => {
    const Fields = req.body;

    try {
    // update issue
    const doc = await Issue.findById(Fields.issueID)
    let prevDoc = {...doc._doc};
    doc.summary = Fields.summary;
    await doc.save()

    const versions = await IssueVersion.find({});
    // unique _id created by mongodb
    const prevUID = prevDoc?._id  

    // create version id 
    const VersionID = versions.filter(ver => 
        ver.Version?.issueID?.toString() === prevUID?.toString()
    ).length + 1


    delete prevDoc._id

    // create issue version
    IssueVersion.create({
        issueID: prevUID,
        newSummary: Fields.summary,
        modifiedBy: Fields.modifiedBy,
        modifiedField: 'summary',
        wasModified: !( Fields.summary === prevDoc.summary ),
        ...prevDoc
    },
    (err) => {
        if (err) {
            console.log(err);
            res.status(501).send(err)
        }
    }
    )

    res.status(200).send(doc)

    } catch (err) {
        res.status(500).send(err)
    }
};


const editIssueAssignee = async (req, res) => {
    const Fields = req.body;

    try {
    // update issue
    const doc = await Issue.findById(Fields.issueID)
    let prevDoc = {...doc._doc};

    const Users = await User.find({})
    const userExists = Users?.filter(user => 
        user._id?.toString() === Fields?.assignedTo.toString()
    )?.length

    if (!userExists) {
        res.status(501).json({
            message: 'user does not exist'
        })
        return;
    }

    doc.assignedTo = Fields.assignedTo;
    await doc.save()

    const versions = await IssueVersion.find({});
    // unique _id created by mongodb
    const prevUID = prevDoc?._id  

    // create version id 
    const VersionID = versions.filter(ver => 
        ver.Version?.issueID?.toString() === prevUID?.toString()
    ).length + 1


    delete prevDoc._id

    // console.log(prevDoc.assignedTo.toString())
    // console.log(mongoose.Types.ObjectId(Fields.assignedTo) );
    // console.log(prevDoc.assignedTo.toString() === Fields.assignedTo)
    
    // create issue version
    IssueVersion.create({
        issueID: prevUID,
        newAssignee: Fields.assignedTo,
        modifiedBy: Fields.modifiedBy,
        modifiedField: 'assignedTo',
        wasModified: !( Fields.assignedTo === prevDoc.assignedTo.toString() ),
        ...prevDoc
    },
    (err) => {
        if (err) {
            console.log(err);
            res.status(502).send(err)
        }
    }
    )

    res.status(200).send(doc)

    } catch (err) {
        res.status(500).send(err)
    }
}



const editIssueType = async (req, res) => {
    const Fields = req.body;

    try {
    // update issue
    const doc = await Issue.findById(Fields.issueID)
    let prevDoc = {...doc._doc};

    const Users = await User.find({})
    const userExists = Users?.filter(user => 
        user._id?.toString() === Fields?.assignedTo.toString()
    )?.length

    if (!userExists) {
        res.status(501).json({
            message: 'user does not exist'
        })
        return;
    }

    doc.type = Fields.type;
    await doc.save()

    const versions = await IssueVersion.find({});
    // unique _id created by mongodb
    const prevUID = prevDoc?._id  

    // create version id 
    const VersionID = versions.filter(ver => 
        ver.Version?.issueID?.toString() === prevUID?.toString()
    ).length + 1


    delete prevDoc._id


    // create issue version
    IssueVersion.create({
        issueID: prevUID,
        newType: Fields.type,
        modifiedBy: Fields.modifiedBy,
        modifiedField: 'type',
        wasModified: !( Fields.type === prevDoc.type ),
        ...prevDoc
    },
    (err) => {
        if (err) {
            console.log(err);
            res.status(502).send(err)
        }
    }
    )

    res.status(200).send(doc)

    } catch (err) {
        res.status(500).send(err)
    }

}


const editIssueSprint = async (req, res) => {
    const Fields = req.body;
    console.log(Fields)
    try {
    // update issue
    const doc = await Issue.findById(Fields.issueID)
    console.log(doc.sprint)
    let prevDoc = {...doc._doc};

    console.log(mongoose.Types.ObjectId(Fields.sprint))
    doc.sprint = Fields.sprint;
    // await doc.markModified('sprint')
    await doc.save()

    console.log('UPDATED HERE:')
    console.log(doc.sprint)

    // unique _id created by mongodb
    const prevUID = prevDoc?._id  

    delete prevDoc._id


    // create issue version
    IssueVersion.create({
        issueID: prevUID,
        newSprint: Fields.sprint,
        modifiedBy: Fields.modifiedBy,
        modifiedField: 'sprint',
        wasModified: !( Fields.sprint === prevDoc?.sprint?.toString() ),
        ...prevDoc
    },
    (err) => {
        if (err) {
            console.log(err);
            res.status(502).send(err)
        }
    }
    )

    res.status(200).send(doc)

    } catch (err) {
        res.status(500).send(err)
        console.log(err)
    }

}


// const editIssueType = async (req, res) => {
//     const issueFields = req.body;
//     Issue.findById(
//         issueFields._id, 
//         (err, doc) => {
//         if (err) {
//             console.log(err)
//             res.status(500).send(err)
//         }
//         doc.type = issueFields.type;
//         doc.updatedAt = Date();
//         doc.save();
//         res.status(200).send(issueFields.type)
//         });
//     };


// const editIssueSprint = async (req, res, next) => {
//     const Fields = req.body;
//     Issue.updateMany(
//         { _id: {$in: Fields.issues} },
//         { sprint: Fields.SprintID },
//         { multi: true },

//             (err, docs) =>  {
//             if (err){
//                 console.log(err)
//                 res.status(501).send(err);
//             }
//             else {
//                 next();
//             }
//         }
//     )

// }




const editIssueStage = async (req, res) => {
    const Fields = req.body;

    try {
    // update issue
    // copy the current version and save it before updating
    const doc = await Issue.findById(Fields.issueID)
    let prevDoc = {...doc._doc};
        console.log(Fields.stage)
    doc.stage = Fields.stage;
    if (Fields?.ToBacklogOrSprint) doc.sprint = Fields.sprint;

    if (Fields.stage.toLowerCase() === 'backlog') doc.sprint = undefined
    await doc.save()

    const versions = await IssueVersion.find({});
    // unique _id created by mongodb
    const prevUID = prevDoc?._id  

    // create version id (== no. of versions of this issue)
    const VersionID = versions.filter(ver => 
        ver.Version?.issueID?.toString() === prevUID?.toString()
    ).length + 1


    delete prevDoc._id


    // create issue version
    IssueVersion.create({
        issueID:        prevUID,
        newStage:       Fields.stage,
        newSprint:      Fields?.ToBacklogOrSprint ? Fields.sprint : '',
        modifiedBy:     Fields?.modifiedBy,
        modifiedField:  Fields?.ToBacklogOrSprint ? 'sprint' : 'stage',
        wasModified:    !( Fields.stage === prevDoc.stage ),
        ...prevDoc
    },
    (err) => {
        if (err) {
            console.log(err);
            res.status(501).send(err)
        }
    }
    )

    res.status(200).send(doc)

    } catch (err) {
        res.status(500).send(err)
    }
    

}

const updateIssueStage = async (req, res) => {
    const Fields = req.body;
    Issue.updateOne(
        { _id: Fields.issueID },
        { stage: Fields.stage },
         (err, docs) =>  {
            if (err){
                console.log(err)
                res.status(500).send(err);
            }
            else {
                res.status(200).send(docs)
            }
        }
    )

}


const transferManyIssuesStage = async (req, res, next) => {
    const Fields = req.body;
    Issue.updateMany(
        { _id: {$in: Fields.issues} },
        { stage: Fields.stage },
        { multi: true },
         (err, docs) =>  {
            if (err){
                console.log(err)
                res.status(500).send(err);
            }
            else {
                next()
            }
        })
}


const editManyIssuesStage = async (req, res) => {
    const Fields = req.body;
    Issue.updateMany(
        { _id: {$in: Fields.issues} },
        { stage: Fields.newStageTitle },
        { multi: true },
         (err, docs) =>  {
            if (err){
                console.log(err)
                res.status(500).send(err);
            }
            else {
                res.status(200).send(err);
            }
        })
}


// move issue from backlog to sprint
// const moveIssueToSprint = async (req, res) => {
//     const Fields = req.body;

//     try {
//     // update issue

//     const doc = await Issue.findById(Fields.issueID)
//     let prevDoc = {...doc._doc};

//     const sprint = await Sprint.findById(Fields.sprintID);

//     if (!sprint) {
//         res.status(501).json({
//             message: 'could not find sprint'
//         })
//     }

//     const stageExists = sprint?.stages?.filter(stage => 
//         stage.title?.toLowerCase() === Fields.stage?.toLowerCase()
//         )?.length
        
//     if (!stageExists) {
//         res.status(502).json({
//             message: 'stage does not exist'
//         })
//     }

//     doc.stage = 'to do';
//     await doc.save()

//     const versions = await IssueVersion.find({});
//     // unique _id created by mongodb
//     const prevUID = prevDoc?._id  

//     // create version id 
//     const VersionID = versions.filter(ver => 
//         ver.Version?.issueID?.toString() === prevUID?.toString()
//     ).length + 1


//     delete prevDoc._id

//     const userOfMod = await User.findById(Fields.modifiedBy)
//     // [insert user name] updated the Stage
//     const ModSummary = `${
//         userOfMod.firstName 
//         + ' ' + userOfMod.lastName 
//         + ' updated the Stage'}`

//     // create issue version
//     IssueVersion.create({
//         Version: {
//             issueID: prevUID,
//             ID: VersionID,
//             ModSummary: ModSummary,
//             NewStage: 'to do',  
//             NewSprint: Fields.sprint,
//             modifiedBy: Fields.modifiedBy,
//             modifiedField: 'sprint',
//         },
//         ...prevDoc
//     },
//     (err) => {
//         if (err) {
//             console.log(err);
//             res.status(501).send(err)
//         }
//     }
//     )

//     res.status(200).send(doc)

//     } catch (err) {
//         res.status(500).send(err)
//     }
// }
// const moveIssueToSprint = async (req, res) => {
//     const Fields = req.body;

//     const {
//         draggedIssue,
//     } = Fields

//     Issue.findOneAndUpdate(
//         { '_id': draggedIssue._id }, 
//         { $set: { 
//             'sprint': draggedIssue.sprint, 
//             'stage': 'To Do',
//         }})
//          .exec(function(err, doc) {
//         if (err) {
//             console.log(err);
//             res.status(500).send(err);
//         } else {
//             res.status(200).send(doc)
//         }
//      });

// }

// move issue from sprint to backlog

const moveIssueToBacklog = async (req, res) => {
    const Fields = req.body;

    const {
        draggedIssue,
    } = Fields

    Issue.findOneAndUpdate(
        { '_id': draggedIssue._id }, 
        { 
            $unset : { 'sprint': '' },
            $set : { 
            'stage': 'backlog',
        }})
         .exec(function(err, doc) {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).send(doc)
        }
     });
     
}


const deleteIssue = (req, res) => {
    const issueFields = req.body;
    Issue.findByIdAndDelete(
        issueFields._id,
        (err, doc) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            }
            res.status(200).send(doc);
        }
        )
    };



// handles deletion of sprint
const moveMultiIssuestoBacklog = async (req, res, next) => {
    const Fields = req.body;
    
    Issue.updateMany(
        { _id: {$in: Fields.SprintID} },
        { $set: { sprint: undefined, stage: 'backlog' } },
        { multi: true },

            (err, docs) =>  {
            if (err){
                console.log(err)
                res.status(501).send(err);
            }
            else {
                res.status(200).send(err);
            }
        }
    )

}


const deleteMultipleIssues = async (req, res, next) => {
    const Fields = req.body;
    
    Issue.deleteMany(
        { _id: {$in: Fields.SprintID} },
            (err, docs) =>  {
            if (err){
                console.log(err)
                res.status(501).send(err);
            }
            else {
                res.status(200).send(err);
            }
        }
    )

}

const reOrderIssues = async (req, res) => {
    try {
        const fields = req.body
        var issues = new StageIssues(fields.stage)
        console.log(issues)
        console.log(issues.get())
        
        res.status(200).send('ok')

    } catch (error) {
        console.log(error)
        res.status(500).send('not ok')
        return;
    }
    
}

module.exports = {
    getIssues, 
    addIssue, 
    editIssueSummary,
    editIssueType,
    editIssueSprint,
    
    editIssueStage,
    updateIssueStage,
    transferManyIssuesStage,
    editManyIssuesStage,
    editIssueAssignee,
    moveIssueToBacklog,
    deleteIssue,
    reOrderIssues
}
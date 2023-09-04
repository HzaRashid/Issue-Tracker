const { nextDay } = require('date-fns');
const e = require('express');
const Project = require('../models/Project');
var mongoose = require('mongoose');

const getProjects = (req, res) => {
    Project.find({}, 
        (err, result) => {
            if (err) {
                res.json(err)
            } 
            else {
                res.status(200).json(result) 
            }
        })
    };


const addProject = async (req, res) => {
    try { 
        const projectFields = req.body;
        const newProject = await Project.create(projectFields);
        req.body.ProjID = newProject._id
        console.log(req.body)
        res.status(200).send(newProject)
    } 
    catch (e) {
        console.log(e.message)
        res.status(500).send(e.message)
    }
        
    };

const editProjectTitle = async (req, res) => {
    const projectFields = req.body;
    Project.findById(
        projectFields.projectID, 
        (err, doc) => {
        if (err) {
            console.log(err)
            res.status(400).send("Request failed")
        }
        if (!doc) res.status(500).send("project not found")
        doc.title = projectFields.title;
        doc.updatedAt = Date();
        doc.save();
        res.status(200).send(projectFields.title)
        });
    };

const editProjectTitleNext = async (req, res, next) => {
    const projectFields = req.body;
    Project.findById(
        projectFields.projectID, 
        (err, doc) => {
        if (err) {
            console.log(err)
            res.status(400).send("Request failed")
        }
        if (!doc) res.status(500).send("project not found")
        doc.title = projectFields.title;
        doc.updatedAt = Date();
        doc.save();
        next()
    });
};


const editProjectTeam = async (req, res) => {

    const projectFields = req.body;
    Project.findById(
        projectFields?._id, 
        (err, doc) => {
        if (err) {
            console.log(err)
            res.status(400).send("Request failed")
        }
        doc.assignedTo = projectFields.assignedTo;
        doc.updatedAt = Date();
        doc.markModified('assignedTo');
        doc.save();
        res.status(200).send(projectFields.title)
    });

};


const editProjectStartDate = async (req, res) => {
    const projectFields = req.body;
    Project.findById(
        mongoose.Types.ObjectId(projectFields?._id), 
        (err, doc) => {
        if (err) {
            console.log(err)
            res.status(400).send("Request failed")
        }
        doc.startDate = projectFields.startDate;
        doc.updatedAt = Date();
        doc.save();
        res.status(200).send(projectFields.startDate)
      });
    };


const editProjectEndDate = async (req, res) => {
    const projectFields = req.body;
    Project.findById(
        projectFields._id, 
        (err, doc) => {
        if (err) {
            console.log(err)
            res.status(400).send("Request failed")
        }
        doc.endDate = projectFields.endDate;
        doc.updatedAt = Date();
        doc.save();
        res.status(200).send(projectFields.endDate)
        });
    };


const editProjectDesc = async (req, res) => {
    const projectFields = req.body;
    Project.findById(
        projectFields._id, 
        (err, doc) => {
        if (err) {
            console.log(err)
            res.status(400).send("Request failed")
        }
        doc.description = projectFields.description;
        doc.updatedAt = Date();
        doc.save();
        res.status(200).send(projectFields.description)
        });
    };


const deleteProject = (req, res) => {
    const projectFields = req.body;
    Project.findByIdAndDelete(
        projectFields._id,
        (err, doc) => {
            if (err) {
                console.log(err);
                res.status(500).send("Request failed");
            }
            res.status(200).send("Project successfully deleted")
        }
        )
    };
    

module.exports = {
    getProjects, 
    addProject, 
    editProjectTitle,
    editProjectTitleNext,
    editProjectTeam,
    editProjectDesc,
    editProjectStartDate, 
    editProjectEndDate,
    deleteProject 
}
const e = require('express');
const User = require('../models/User')

const getUsers = (req, res) => {
    User.find({}, 
        (err, result) => {
            if (err) {
                res.json(err)
            } 
            else {
                res.json(result) 
            }
        })
    };


const addUser = async (req, res) => {
    try { 
        const userFields = req.body;
        await User.create(userFields);
        res.json(userFields);
    } 
    catch (e) {
        console.log(e.message)
    }
        
    };


const editUserRole = async (req, res) => {
    const userFields = req.body;
    User.findById(
        userFields._id, 
        (err, doc) => {
        if (err) {
            console.log(err)
            res.status(400).send("Request failed")
        }
        doc.role = userFields.role;
        doc.updatedAt = Date();
        doc.save();
        res.status(200).send(userFields.role)
      });
    };


const editUserProjs = async (req, res) => {
    const Fields = req.body;
    User.updateMany(
        { _id: {$in: Fields.assignedTo} },
        { $addToSet: { projects: Fields.ProjID } },
        { multi: true },
         (err, docs) =>  {
            if (err){
                console.log(err)
                res.status(501).send(err);
            }
            else {
                console.log("Updated Docs : ", docs);
                res.status(200).send('ok')
            }
        }
    )

}



const deleteUser = (req, res) => {
    const userFields = req.body;
    User.findByIdAndDelete(
        userFields._id,
        (err, doc) => {
            if (err) {
                console.log(err);
                res.status(400).send("Request failed");
            }
            res.status(200).send("User successfully deleted")
        }
        )
    };
    

module.exports = {
    getUsers, 
    addUser, 
    editUserRole, 
    editUserProjs, 
    deleteUser
}
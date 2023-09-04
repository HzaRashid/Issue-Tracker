const e = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
        const userFields = req.body
        const hash = await bcrypt.hash(userFields.password, saltRounds);
        userFields.password = hash;
        const newUser = await User.create(userFields);
        res.status(200).json( { ...newUser, password: undefined } );
        
    } 
    catch (e) {
        console.log(e.message)
        res.status(500).send(e)
    }
};


const addProjectUser = async (req, res) => {
    const Fields = req.body
    console.log(req.body)
    User.updateMany(
        {  _id: { $in: Fields.assignedTo } },
        { $push: { projects: Fields.projectID } },
        {multi: true},
        function(err, docs) {
        if (err) return res.status(500);
        console.log(docs);
        res.status(200).send( { message: 'users added to project'} );
        // console.log('GOING NEXT')
        // next();
        }
    )
};

const addProjectUserNext = async (req, res, next) => {
    const Fields = req.body
    console.log(req.body)
    User.updateMany(
        {  _id: { $in: Fields.assignedTo } },
        { $push: { projects: Fields.projectID } },
        {multi: true},
        function(err, docs) {
        if (err) return res.status(500);
        console.log(docs);
        // res.status(200).send( { message: 'users added to project'} );
        // console.log('GOING NEXT')
        next();
        }
    )
};

const deleteProjectUser = async (req, res) => {
    const Fields = req.body
    console.log(req.body)
    User.updateMany(
        {  _id: { $in: Fields.removeUsers } },
        { $pull: { projects: Fields.projectID } },
        {multi: true},
        function(err, docs) {
        if (err) return res.status(500)
        console.log(docs)
        return res.status(200).send( { message: 'project users updated'} )
        }
    )
};


const editUser = async (req, res) => {
    try { 
    const userFields =  req.body;
    const doc        =  await User.findById(userFields._id);
    doc.firstName =     userFields.firstName ?? doc.firstName;
    doc.lastName  =     userFields.lastName  ?? doc.lastName
    doc.email     =     userFields.email     ?? doc.email;
    doc.role      =     userFields.role      ?? doc.role;

    if (userFields?.password) {
    const hash    =     await bcrypt.hash(userFields.password, saltRounds);
    doc.password  =     hash;
    }
    doc.updatedAt =     Date();
    await doc.save();

    res.status(200).send(userFields)
    
    } catch (err) {
        res.status(500).send(err)
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



const changePassword = async (req, res) => {
    try {
        const userFields = req.body
        const hash = await bcrypt.hash(userFields.password, saltRounds);
        const user = await User.findById(userFields.id)
        user.password = hash;
        await user.save()
        res.status(200).send("Password changed successfully")
        
    } catch (error) {
        console.log(error)
    }
}
    

module.exports = {
    getUsers, 
    addUser, 
    addProjectUser,
    addProjectUserNext,
    deleteProjectUser,
    editUserRole, 
    editUser,
    editUserProjs, 
    deleteUser
}
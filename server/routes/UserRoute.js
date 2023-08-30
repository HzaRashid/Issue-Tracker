const express = require('express');
const router = express.Router();
router.use(express.json());
const { 
    getUsers, 
    addUser, 
    addProjectUser,
    addProjectUserNext,
    deleteProjectUser,
    editUserRole, 
    editUser,
    deleteUser
} = require('../controllers/UserCtrl')
module.exports = router;
const { isAuthDemo } = require('./Auth/isAuth')

router.get('/', getUsers);
router.post('/add',         isAuthDemo, addUser);
router.put('/project',      isAuthDemo, addProjectUser);
router.put('/project-team', isAuthDemo, addProjectUserNext, deleteProjectUser);
router.put('/edit-role/',   isAuthDemo, editUserRole);
router.put('/edit',         isAuthDemo, editUser);
router.delete('/:id',       isAuthDemo, deleteUser);
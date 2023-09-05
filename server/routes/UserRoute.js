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

const { isAuthDemo, isAuth } = require('./Auth/isAuth')

router.get('/', isAuth, getUsers);
router.post('/add',          isAuthDemo, addUser);
router.put('/project',       isAuthDemo, addProjectUser);
router.put('/project-team',  isAuthDemo, addProjectUserNext, deleteProjectUser);
router.put('/edit-role/',    isAuthDemo, editUserRole);
router.put('/edit',          isAuthDemo, editUser);
router.delete('/:id',        isAuthDemo, deleteUser);

module.exports = router;
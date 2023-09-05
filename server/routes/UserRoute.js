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

const { isAuthDemo } = require('./Auth/isAuth')

router.get('/', getUsers);
router.post('/add',          addUser);
router.put('/project',       addProjectUser);
router.put('/project-team',  addProjectUserNext, deleteProjectUser);
router.put('/edit-role/',    editUserRole);
router.put('/edit',          editUser);
router.delete('/:id',        deleteUser);

module.exports = router;
const express = require('express');
const router = express.Router();
router.use(express.json());
const { 
    getUsers, 
    addUser, 
    addProject,
    editUserRole, 
    editUser,
    deleteUser
} = require('../controllers/UserCtrl')
module.exports = router;


router.get('/', getUsers);
router.post('/add', addUser);
router.post('/project', addProject);
router.put('/edit-role/', editUserRole);
router.put('/edit', editUser);
router.delete('/:id', deleteUser);
const express = require('express');
const router = express.Router();
router.use(express.json());
const { 
    getUsers, 
    addUser, 
    editUserRole, 
    deleteUser 
} = require('../controllers/UserCtrl')
module.exports = router;


router.get('/', getUsers);
router.post('/', addUser);
router.put('/edit-role/:id', editUserRole);
router.delete('/:id', deleteUser);
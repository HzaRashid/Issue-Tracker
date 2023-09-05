const express = require('express');
const router = express.Router();
router.use(express.json());
const {     
    getProjects, 
    addProject, 
    editProjectTitle,
    editProjectTitleNext,
    editProjectTeam,
    editProjectDesc,
    editProjectStartDate, 
    editProjectEndDate,
    deleteProject 
} = require('../controllers/ProjectCtrl')
const { addProjectUser,addProjectUserNext, deleteProjectUser } = require('../controllers/UserCtrl')
const { isAuthDemo, isAuth } = require('../routes/Auth/isAuth')
module.exports = router;

router.get('/', isAuth, getProjects);

router.post('/',         isAuthDemo, addProject);
router.put('/title',     isAuthDemo, editProjectTitle);
router.put('/edit-all',  isAuthDemo, editProjectTitleNext, addProjectUserNext, deleteProjectUser);
router.put('/add-team',  isAuthDemo, addProjectUser);

router.put('/team',         isAuthDemo, editProjectTeam);
router.put('/key',          isAuthDemo, editProjectTitle);
router.put('/startDate',    isAuthDemo, editProjectStartDate);
router.put('/endDate',      isAuthDemo, editProjectEndDate);
router.put('/description',  isAuthDemo, editProjectDesc);
router.delete('/delete',    isAuthDemo, deleteProject);
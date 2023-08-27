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
const { isAuthDemo } = require('../routes/Auth/isAuth')
module.exports = router;

router.get('/', getProjects);

router.post('/',        isAuthDemo, addProject);
router.put('/title',    isAuthDemo, editProjectTitle);
router.put('/edit-all', isAuthDemo, editProjectTitleNext, addProjectUserNext, deleteProjectUser);
router.put('/add-team', isAuthDemo, addProjectUser);

router.put('/team', editProjectTeam);
router.put('/key', editProjectTitle);
router.put('/startDate', editProjectStartDate);
router.put('/endDate', editProjectEndDate);
router.put('/description', editProjectDesc);
router.delete('/delete', deleteProject);
const express = require('express');
const router = express.Router();
router.use(express.json());
const {     
    getProjects, 
    addProject, 
    editProjectTitle,
    editProjectTeam,
    editProjectDesc,
    editProjectStartDate, 
    editProjectEndDate,
    deleteProject 
} = require('../controllers/ProjectCtrl')

module.exports = router;

router.get('/', getProjects);
router.post('/', addProject);
router.put('/title', editProjectTitle);
router.put('/team', editProjectTeam);
router.put('/key', editProjectTitle);
router.put('/startDate', editProjectStartDate);
router.put('/endDate', editProjectEndDate);
router.put('/description', editProjectDesc);
router.delete('/delete', deleteProject);
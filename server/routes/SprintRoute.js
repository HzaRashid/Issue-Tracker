const express = require('express');
const router = express.Router();
router.use(express.json());
const {     
    getSprints, 
    addSprint, 
    editSprintTitle,
    editSprintStartDate, 
    editSprintEndDate,
    editSprintStageTitle,
    addSprintStage,
    editSprintStageIssueLimit,
    deleteSprint,
    GeneralEdit
} = require('../controllers/SprintCtrl')
const { editIssueSprint, editManyIssuesStage } = require('../controllers/IssueCtrl');
const { isAuthDemo } = require('./Auth/isAuth');

module.exports = router;




router.put('/update-stage-title',  
                            isAuthDemo, editSprintStageTitle, editManyIssuesStage)

router.put('/update-stage-issue-limit', 
                            isAuthDemo, editSprintStageIssueLimit)

router.put('/add-stage',    isAuthDemo, addSprintStage)


router.get('/', getSprints);

router.post('/',            isAuthDemo, addSprint, editIssueSprint);  

router.put('/title',        isAuthDemo, editSprintTitle);
router.put('/startDate',    isAuthDemo, editSprintStartDate);
router.put('/endDate',      isAuthDemo, editSprintEndDate);
router.put('/edit',         isAuthDemo, GeneralEdit);


router.delete('/delete',    isAuthDemo, deleteSprint);
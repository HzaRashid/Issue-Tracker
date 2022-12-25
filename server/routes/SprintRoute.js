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
    deleteSprint
} = require('../controllers/SprintCtrl')
const { editIssueSprint, editManyIssuesStage } = require('../controllers/IssueCtrl')

module.exports = router;




router.put(
    '/update-stage-title',
    editSprintStageTitle,
    editManyIssuesStage
)

router.put(
    '/update-stage-issue-limit',
    editSprintStageIssueLimit
)

router.put(
    '/add-stage',
    addSprintStage
)


router.get('/', getSprints);

router.post(
    '/', 
    addSprint, 
    editIssueSprint, 
    );  

router.put('/title', editSprintTitle);
router.put('/startDate', editSprintStartDate);
router.put('/endDate', editSprintEndDate);
router.delete('/delete', deleteSprint);
const express = require('express');
const router = express.Router();
router.use(express.json());
const {     
    getIssues, 
    addIssue, 
    editIssueSummary,
    editIssueType,
    editIssueStage,
    updateIssueStage,
    transferManyIssuesStage,
    editIssueAssignee,
    moveIssueToSprint,
    moveIssueToBacklog,
    deleteIssue,
    reOrderIssues
} = require('../controllers/IssueCtrl')
const { deleteSprintStage } = require('../controllers/SprintCtrl')

module.exports = router;


router.get('/', getIssues);
router.post('/', addIssue);
router.put('/summary', editIssueSummary);
router.put('/type', editIssueType);
router.put('/stage', editIssueStage);
router.put('/board-stage', updateIssueStage);
router.put('/assignee', editIssueAssignee);
router.put('/many-issues-stage', transferManyIssuesStage, deleteSprintStage);
router.put('/backlog-to-sprint', moveIssueToSprint)
router.put('/sprint-to-backlog', moveIssueToBacklog)
router.delete('/delete', deleteIssue);

router.put('/reorder', reOrderIssues)
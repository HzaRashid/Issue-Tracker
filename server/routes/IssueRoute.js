const express = require('express');
const router = express.Router();
router.use(express.json());
const {     
    getIssues, 
    addIssue, 
    editIssueSummary,
    editIssueType,
    editIssueStage,
    editIssueSprint,
    transferManyIssuesStage,
    editIssueAssignee,
    deleteIssue,
    reOrderIssues
} = require('../controllers/IssueCtrl')
const {     
    sendIssueVersions,
    getIssueVersions
} = require('../controllers/IssueVersionCtrl')
const { deleteSprintStage } = require('../controllers/SprintCtrl')

module.exports = router;


router.get('/', getIssues);
router.get('/versions/sse', sendIssueVersions)
router.get('/versions', getIssueVersions)
router.post('/add-issue', addIssue);
router.put('/summary', editIssueSummary);
router.put('/type', editIssueType);
router.put('/stage', editIssueStage);
router.put('/sprint', editIssueSprint);
router.put('/board-stage', editIssueStage);
router.put('/assignee', editIssueAssignee);
router.put('/many-issues-stage', transferManyIssuesStage, deleteSprintStage);
// router.put('/backlog-to-sprint', moveIssueToSprint)
// router.put('/sprint-to-backlog', moveIssueToBacklog)
router.delete('/delete', deleteIssue);

router.put('/reorder', reOrderIssues)
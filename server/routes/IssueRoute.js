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
const { isAuthDemo } = require('../routes/Auth/isAuth')
module.exports = router;


router.get('/', getIssues);
router.get('/versions/sse/:id', sendIssueVersions)
router.get('/versions/:id', getIssueVersions)
router.post('/add-issue', addIssue);

router.put('/summary',       editIssueSummary);
router.put('/type',          editIssueType);
router.put('/sprint',        editIssueSprint);
router.put('/assignee',      editIssueAssignee);
router.put('/stage',         editIssueStage);

router.put('/board-stage',   editIssueStage);


router.put('/many-issues-stage', transferManyIssuesStage, deleteSprintStage);
router.delete('/delete',     deleteIssue);
router.put('/reorder', reOrderIssues);
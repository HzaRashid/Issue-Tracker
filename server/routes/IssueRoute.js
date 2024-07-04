const express = require('express');
const router = express.Router();
router.use(express.json());
const {     
    getIssues, 
    getIssuesTable,
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
const { isAuthDemo, isAuth } = require('../routes/Auth/isAuth')
module.exports = router;


router.get('/',                 isAuth, getIssues);
router.get('/table',            isAuth, getIssuesTable);
router.get('/versions/sse/:id', isAuth, sendIssueVersions)
router.get('/versions/:id',     isAuth, getIssueVersions)
router.post('/add-issue',       isAuthDemo, addIssue);

router.put('/summary',          isAuthDemo, editIssueSummary);
router.put('/type',             isAuthDemo, editIssueType);
router.put('/sprint',           isAuthDemo, editIssueSprint);
router.put('/assignee',         isAuthDemo, editIssueAssignee);
router.put('/stage',            isAuthDemo,  editIssueStage);

router.put('/board-stage',      isAuthDemo, editIssueStage);


router.put('/many-issues-stage',    transferManyIssuesStage, deleteSprintStage);
router.delete('/delete',            deleteIssue);
router.put('/reorder',              reOrderIssues);
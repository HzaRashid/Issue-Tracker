import React from 'react'
import CreateSprint from './Projects/Sprints/Create/CreateSprint'
import CreateProj from './Projects/Create/CreateProj'
import ProjStatus from './Projects/Create/ProjStatus'
import CreateIssue from './Issues/Create/CreateIssue'
import IssueStatus from './Issues/Create/IssueStatus'
import IsMobile from '../components/utils/isMobile'
import DeleteStage from './Projects/SprintBoard/EditStage/Delete/DeleteStage'
import SetIssueLimit from './Projects/SprintBoard/EditStage/IssueLimit/SetIssueLimit'
import EditIssue from './Issues/Edit/EditIssue'



function Popups() {
  return (
    <>
    <IsMobile/>
    <CreateIssue/>
    <IssueStatus/>
    <CreateProj/>
    <ProjStatus/>
    <CreateSprint/>
    <DeleteStage/>
    <SetIssueLimit/>
    <EditIssue/>
    </>
  )
}

export default Popups
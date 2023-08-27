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
import EditProj from './Projects/Edit/EditProj'
import AssignToProj from './Team/AssignToProject/AssignToProj'
import AddUser from './Team/AddUser/AddUser'
import AddUserStatus from './Team/AddUser/AddUserStatus'
import EditUser from './Team/EditUser/EditUser'
import EditUserStatus from './Team/EditUser/EditUserStatus'
import EditThisUser from './LoggedInUser/Edit/EditThisUser'
import EditThisUserStatus from './LoggedInUser/Edit/EditThisUserStatus'
import EditSprint from './Projects/Sprints/Edit/EditSprint'
import SprintStatus from './Projects/Sprints/Create/SprintStatus'
import EditSprintStatus from './Projects/Sprints/Edit/EditSprintStatus'



function Popups() {
  return (
    <>
    <IsMobile/>
    <CreateIssue/>
    <IssueStatus/>
    <CreateProj/>
    <EditProj/>
    <ProjStatus/>
    <CreateSprint/>
    <SprintStatus/>
    <DeleteStage/>
    <SetIssueLimit/>
    <EditIssue/>
    <AssignToProj/>
    <AddUser/>
    <AddUserStatus/>
    <EditUser/>
    <EditUserStatus/>
    <EditThisUser/>
    <EditThisUserStatus/>
    <EditSprint/>
    <EditSprintStatus/>
    </>
  )
}

export default Popups
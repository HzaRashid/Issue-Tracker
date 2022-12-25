import React from 'react'
import '../../../index.css'
import { IssueContexts } from '../../../contexts/IssueContexts';
import IssueForm from './IssueForm';
import CustomModal from '../../CustomModal';


function CreateIssue() {
  const { IssueModal } = IssueContexts();


  return (
    <CustomModal open={IssueModal}>
     <IssueForm/> 
    </CustomModal>
  )
}

export default CreateIssue
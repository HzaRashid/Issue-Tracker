import React from 'react'
import SprintForm from './SprintForm';
import { SprintContexts } from '../../../../contexts/SprintContexts';
import CustomModal from '../../../CustomModal';


function CreateIssue() {
  const { SprintModal } = SprintContexts();


  return (
    <CustomModal open={SprintModal}> 
       <SprintForm/>
    </CustomModal>


  )
}

export default CreateIssue
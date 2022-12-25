import React from 'react'
import CustomModal from '../../../../CustomModal'
import { SprintContexts } from '../../../../../contexts/SprintContexts'
import DeleteStageForm from './DeleteStageForm';

function DeleteStage(){
    const { openDeleteStage } = SprintContexts();
  return (
    
    <CustomModal open={openDeleteStage}>
      <DeleteStageForm/>
    </CustomModal>
  )
}

export default DeleteStage
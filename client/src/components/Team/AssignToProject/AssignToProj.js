import React from 'react'
import AssignToProjForm from './AssignToProjForm'
import { TeamContexts } from '../../../contexts/TeamContexts'
import CustomModal from '../../CustomModal';

function AssignToProj() {
    const { AssignProjModal } = TeamContexts();
  return (
    <CustomModal open={AssignProjModal}> 
    <AssignToProjForm />
   </CustomModal>
  )
}

export default AssignToProj
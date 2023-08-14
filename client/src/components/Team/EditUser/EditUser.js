import React from 'react'
import { TeamContexts } from '../../../contexts/TeamContexts'
import CustomModal from '../../CustomModal';
import EditUserForm from './EditUserForm'
function EditUser() {
    const { EditUserModal } = TeamContexts();
  return (
    <CustomModal open={ EditUserModal }> 
    <EditUserForm />
   </CustomModal>
  )
}

export default EditUser;
import React from 'react'
import { TeamContexts } from '../../../contexts/TeamContexts'
import CustomModal from '../../CustomModal';
import EditThisUserForm from './EditThisUserForm';

function EditThisUser() {
    const { EditThisUserModal } = TeamContexts();
  return (
    <CustomModal open={ EditThisUserModal }> 
    <EditThisUserForm />
   </CustomModal>
  )
}

export default EditThisUser;
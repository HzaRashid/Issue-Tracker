import React from 'react'
import AddUserForm from './AddUserForm';
import { TeamContexts } from '../../../contexts/TeamContexts'
import CustomModal from '../../CustomModal';

function AddUser() {
    const { AddUserModal } = TeamContexts();
  return (
    <CustomModal open={ AddUserModal }> 
    <AddUserForm />
   </CustomModal>
  )
}

export default AddUser;
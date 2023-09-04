import React from 'react'
import { SprintContexts } from '../../../../contexts/SprintContexts';
import CustomModal from '../../../CustomModal';
import EditSprintForm from './EditSprintForm';




function EditSprint() {
  // eslint-disable-next-line
  const { EditSprintModal, SelectedSprint} = SprintContexts();

  return (
  <> 
  { SelectedSprint && 
    <CustomModal open={EditSprintModal}> 
     <EditSprintForm />
    </CustomModal>
    }
  </>
  )
}

export default EditSprint
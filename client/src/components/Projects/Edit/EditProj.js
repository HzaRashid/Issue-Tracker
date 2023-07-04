import React, { useState } from 'react'
import '../../../index.css'
import { ProjContexts } from '../../../contexts/ProjectContexts';
import ProjForm from './ProjForm';
import CustomModal from '../../CustomModal';

function EditProj() {
  // eslint-disable-next-line
  const { EditProjModal, setEditProjModal, SelectedProj } = ProjContexts();
  // const handleClose = () => setProjModal(false)

  const  [ showReview, setShowReview ] = useState(false);
  return (
  <> 
  { SelectedProj && 
    <CustomModal open={EditProjModal}> 
     <ProjForm showReview={showReview} setShowReview={setShowReview} />
    </CustomModal>
    }
  </>
  )
}

export default EditProj
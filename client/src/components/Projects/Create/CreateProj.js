import React, { useState } from 'react'
import '../../../index.css'
import { ProjContexts } from '../../../contexts/ProjectContexts';
import ProjForm from './ProjForm';
import CustomModal from '../../CustomModal';

function CreateProj() {
  // eslint-disable-next-line
  const { ProjModal, setProjModal } = ProjContexts();
  const [showReview, setShowReview] = useState(false);
  // const handleClose = () => setProjModal(false)

  return (

    <CustomModal open={ProjModal}> 
     <ProjForm showReview={showReview} setShowReview={setShowReview}/>
    </CustomModal>
  
  )
}

export default CreateProj


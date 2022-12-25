import React from 'react'
import CustomModalSmall from '../../../../CustomModalSmall';
import { SprintContexts } from '../../../../../contexts/SprintContexts'
import Form from './Form'


function SetIssueLimit() {
  const { openIssuesLimit } = SprintContexts();
  
  // console.log(openIssuesLimit)
  return (
    <CustomModalSmall open={openIssuesLimit}>
    <Form/>
  </CustomModalSmall>
  )
}

export default SetIssueLimit
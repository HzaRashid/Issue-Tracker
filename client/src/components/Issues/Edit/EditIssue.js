import React from 'react'
import CustomModal from '../../CustomModal'
import { IssueContexts } from '../../../contexts/IssueContexts'
import FormWrapper from './FormWrapper'
import History from './History';

function EditIssue() {
    const { EditIssueModal } = IssueContexts();
  return (
    <CustomModal open={EditIssueModal}>
        <FormWrapper>
          {/* <History/> */}
        </FormWrapper>
    </CustomModal>
  )
}

export default EditIssue
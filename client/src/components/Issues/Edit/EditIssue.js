import React, { useState } from 'react'
import CustomModal from '../../CustomModal'
import { IssueContexts } from '../../../contexts/IssueContexts'
import FormWrapper from './FormWrapper'
import History from '../History/History';
import Comments from '../Comments/Comments';

function EditIssue() {
    const { EditIssueModal } = IssueContexts();
    const [Page, setPage] = useState(0);
  return (
    <CustomModal open={EditIssueModal}>
        <FormWrapper Page={Page} setPage={setPage}>
          {/* <History/> */}
          {Page === 0 ? <History/> : <Comments/>}
        </FormWrapper>
    </CustomModal>
  )
}

export default EditIssue
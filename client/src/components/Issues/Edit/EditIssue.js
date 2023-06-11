import React, { useEffect, useState } from 'react'
import CustomModal from '../../CustomModal'
import { IssueContexts } from '../../../contexts/IssueContexts'
import FormWrapper from './FormWrapper'
import History from '../History/History';
import CommentsComp from '../Comments/Comments';
const data = require('../../../pages/routes.json')
function EditIssue() {
    const { 
      EditIssueModal, 
      Comments, 
      setComments,
      SelectedIssue } 
      = IssueContexts();
      
    const [Page, setPage] = useState(0);
    const [ isListen, setIsListen ] = useState(false);
    useEffect(() => {
      if (!isListen){
        const events = new EventSource(data.Comments);
        events.onmessage = ( e ) => {
            const parsedComments = JSON.parse( e.data )?.msg
            setComments(parsedComments);
          }
          setIsListen(true);
        }  // eslint-disable-next-line
    }, [isListen, Comments])


  return (
    <CustomModal open={EditIssueModal}>
        <FormWrapper Page={Page} setPage={setPage}>
          {/* <History/> */}
          {Page === 0 ? <History/> : <CommentsComp SelectedIssue={SelectedIssue}/>}
        </FormWrapper>
    </CustomModal>
  )
}

export default EditIssue
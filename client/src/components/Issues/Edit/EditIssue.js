import React, { useEffect, useState } from 'react'
import CustomModal from '../../CustomModal'
import { IssueContexts } from '../../../contexts/IssueContexts'
import FormWrapper from './FormWrapper'
import History from '../History/History';
import CommentsComp from '../Comments/Comments';
import Delete from '../Delete/Delete';
const data = require('../../../pages/routes.json')
function EditIssue() {
    const { 
      EditIssueModal, 
      Comments, 
      setComments,
      SelectedIssue } 
      = IssueContexts();
      
    const [Page, setPage] = useState(0);
    const [prevPage, setPrevPage] = useState(0);
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
    const [ OpenDelModal, setOpenDelModal] = useState(false)


  return (
    <CustomModal open={EditIssueModal}>
        <FormWrapper PrevPage={prevPage} Page={Page} setPage={setPage} setPrevPage={setPrevPage} OpenDelModal={OpenDelModal} setOpenDelModal={setOpenDelModal}>
          {/* <History/> */}
          {/* {Page === 0 && ? <History/> : <CommentsComp SelectedIssue={SelectedIssue}/>} */}
          {GetPage(
            Page, 
            setPage,
            SelectedIssue,
            OpenDelModal, 
            setOpenDelModal, 
            prevPage)
            }
        </FormWrapper>
    </CustomModal>
  )
}

function GetPage(
  Page, 
  setPage,
  SelectedIssue,
  OpenDelModal, 
  setOpenDelModal, 
  prevPage) {
  if (Page === 0) return  <History/>
  if (Page === 1) return  <CommentsComp SelectedIssue={SelectedIssue}/>
  if (Page === 3) return  <Delete Page={Page} setPage={setPage} setOpenDelModal={setOpenDelModal} prevPage={prevPage}/>
}

export default EditIssue
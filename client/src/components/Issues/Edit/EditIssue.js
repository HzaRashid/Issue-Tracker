import React, { useState } from 'react'
import CustomModal from '../../CustomModal'
import { IssueContexts } from '../../../contexts/IssueContexts'
import FormWrapper from './FormWrapper'
import History from '../History/History';
import CommentsComp from '../Comments/Comments';
import Delete from '../Delete/Delete';

function EditIssue() {
    const { EditIssueModal, SelectedIssue } = IssueContexts();
      
    const [Page, setPage] = useState(0);
    const [prevPage, setPrevPage] = useState(0);
    const [ IssueVersions, setIssueVersions ] = useState([]);
    const [ Comments, setComments ] = useState([]);
    const [ OpenDelModal, setOpenDelModal] = useState(false);

    return (
      <CustomModal open={EditIssueModal}>
      <FormWrapper
        PrevPage={prevPage} 
        Page={Page} 
        setPage={setPage} 
        setPrevPage={setPrevPage} 
        OpenDelModal={OpenDelModal} 
        setOpenDelModal={setOpenDelModal}
        >
        {
        GetPage(
          Page,
          setPage,
          prevPage,
          SelectedIssue,
          setOpenDelModal, 
          IssueVersions, 
          setIssueVersions,
          Comments, 
          setComments,
          )
        }
      </FormWrapper>
      </CustomModal>
    )
  }
  
  function GetPage(
    Page,
    setPage,
    prevPage,
    SelectedIssue,
    setOpenDelModal, 
    IssueVersions, 
    setIssueVersions,
    Comments, 
    setComments
    
    ) {
    if (Page === 0) return  <History IssueVersions={IssueVersions} setIssueVersions={setIssueVersions}/>
    if (Page === 1) return  <CommentsComp Comments={Comments} setComments={setComments}/>
    if (Page === 3) return  <Delete 
                            setPage={setPage} 
                            setOpenDelModal={setOpenDelModal} 
                            prevPage={prevPage}
                            SelectedIssue={SelectedIssue}
                            />
  }

export default EditIssue
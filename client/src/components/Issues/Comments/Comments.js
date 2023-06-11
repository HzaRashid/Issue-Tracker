import React, { } from 'react'
import { IssueContexts } from '../../../contexts/IssueContexts'
import List from './List';
import Create from './Create';

function Comments( props ) {
    const { Comments, SelectedIssue } = IssueContexts();
    
  return (
    <>
    <div className='h-auto max-h-[8.5em] overflow-auto'> 
    <Create/>
    <List 
    Comments={Comments}
    SelectedIssue={SelectedIssue} 
    />
    </div>
    </>
  )
}

export default Comments
import React, { useState } from 'react'
import { IssueContexts } from '../../../contexts/IssueContexts'
import List from './List';
import Create from './Create';

function Comments( props ) {
    const { Comments, setComments } = props;
  return (
    <>
    <div className='h-auto max-h-[8.5em] overflow-auto'> 
    <Create/>
    <List 
    Comments={Comments}
    setComments={setComments}
    />
    </div>
    </>
  )
}

export default Comments
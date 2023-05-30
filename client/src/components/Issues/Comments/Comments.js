import React, { useEffect, useState } from 'react'
import { IssueContexts } from '../../../contexts/IssueContexts'
import List from './List';
const data = require('../../../pages/routes.json')

function Comments() {
    const { Comments, setComments } = IssueContexts();
    const [ isListen, setIsListen ] = useState(false);

    useEffect(() => {
      if (!isListen){
        const events = new EventSource(data.Comments);
        events.onmessage = ( e ) => {
            const parsedComments = JSON.parse( e.data )?.msg;
            setComments(parsedComments);
          }
          
          setIsListen(true);
        }
        
    }, [isListen, Comments])

  // console.log(Comments)
  return (
    <>
    <List Comments={Comments} />
    </>
  )
}

export default Comments
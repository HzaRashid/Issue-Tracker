import React, { useEffect, useRef } from 'react'
import { TeamContexts } from '../../../contexts/TeamContexts'
import { formatDistance } from 'date-fns'
import Avatar from '@mui/material/Avatar';
import { AuthContexts } from '../../../App/Auth';
import { IssueContexts } from '../../../contexts/IssueContexts';
import stringAvatar from '../../utils/UserAvatar/StringAvatar';


function List( props ) {
    const { Comments, setComments } = props;
    const { SelectedIssue } = IssueContexts();
    const { Users } = TeamContexts();
    const { user } = AuthContexts();
    const loggedInUser = Users.filter(u => u?._id === user?.user)[0]
    const youString = '(You)'
    const CommentRef = useRef(null);

    const setCmnts = e => {
      const parsedComments = JSON.parse( e.data )
      console.log(parsedComments)
      setComments(parsedComments)
    }

    useEffect(() => {
      if (!SelectedIssue?._id) return;
      CommentRef.current = new EventSource(
        `${process.env.REACT_APP_API_CommentSSE }/${SelectedIssue?._id}`,
      { withCredentials: true })
      CommentRef.current.onmessage = e => setCmnts(e)
      CommentRef.current.onerror = () => {
        CommentRef.current.close()
      }
      return () => { CommentRef.current.close() }
      // eslint-disable-next-line
    }, [SelectedIssue?._id])

  return (
    <> 
    <div 
    className='flex items-center justify-center '>
        <ul 
        className=' w-[20em] p-2 rounded-sm 
        h-auto max-h-[6em] overflow-auto'
        >
            {
            Comments
            .filter( c => 
              c?.issue === SelectedIssue?._id
            )
            .sort(
              (a,b) => (new Date(b?.createdAt) - new Date(a?.createdAt))
              )
            .map( c => (
            <li key={c?._id}
            className='mt-[0.65em] first:mt-0 w-[19em] p-[0.1em]'>
            <div>
              {
                Users
                .filter(
                  u => u?._id === c?.createdBy
                )
                .map(
                  u => (
 
                  <div 
                  key={u._id}
                  className='flex items-center space-x-2'> 
                  <Avatar 
                  className=' antialiased'
                  {...stringAvatar(u.firstName + ' ' + u.lastName, 22, 22, '0.4em')} 
                  
                  />
                  <div
                  className='text-[0.65em] 
                  text-[#262626] flex items-center justify-center
                  tracking-[0.02em] font-bold'
                  >
                    {u.firstName + ' ' +  u.lastName}
                    {
                  u._id === loggedInUser._id && 
                  <div className='text-[#00000090] ml-1'>{youString}</div> 
                  }
                  </div>
           
                  <div className='font-light text-[#0000007e]'>
                    -
                  </div>
                  <div className='text-[0.625em] text-[#0000007e]'>
                    {
                    formatDistance(
                      new Date(c.createdAt), new Date(), 
                    { addSuffix: true,
                      includeSeconds: true
                    })}
                  </div>
                  </div>
        
                  )
                )
              }
            </div>
            
            <div 
            className='text-[0.725em] 
            text-[#000000bb] font-medium
            mt-[-0.1em] h-auto max-h-[3em]
            overflow-scroll 
            '
            >
                {c?.comment}
            </div>
            </li>
   
            
            ))}
        </ul>
    </div>
    </>
  )
}

export default List
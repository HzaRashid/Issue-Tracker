import React, {  } from 'react'
import { TeamContexts } from '../../../contexts/TeamContexts'
import { formatDistance } from 'date-fns'
import Avatar from '@mui/material/Avatar';
import { AuthContexts } from '../../../App/Auth';

function List( props ) {
    const { Comments, SelectedIssue } = props
    const { Users } = TeamContexts();
    const { user } = AuthContexts();
    const loggedInUser = Users.filter(u => u?._id === user?.user)[0]
    const youString = '(You)'
    // console.log(Users)
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
                  {...stringAvatar(u.firstName + ' ' + u.lastName)} 
                  
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


function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 4) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 12)) & 0xff;
    color += `00${value.toString(10)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      fontSize:'0.4em', 
      color: '#f0f0f0',
      width:20, 
      height:20,
      

    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}
export default List
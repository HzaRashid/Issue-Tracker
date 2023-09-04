import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { AuthContexts } from '../../App/Auth'
import { TeamContexts } from '../../contexts/TeamContexts';
import stringAvatar from '../utils/UserAvatar/StringAvatar';

function UserInfo() {
    const { user, LoggedInUser, setLoggedInUser } = AuthContexts();
    // console.log(user)
    
    const { Users, setEditThisUserModal } = TeamContexts();
    function getUser (uID) {
      return Users.filter(u => {
        return u._id === uID
      })[0]
    }
    useEffect( () =>  setLoggedInUser(getUser(user.user), [user]))
   
    const [name, setName] = useState('');
    useEffect(
      () => setName(LoggedInUser?.firstName + ' ' + LoggedInUser?.lastName),
      [user, LoggedInUser] )
      
  if (!name || !LoggedInUser) return

  return (
    <div className='absolute top-0 right-0 mr-[2em] mt-[0.85em]'>
      {/* <button className=' bg-slate-200 p-2 rounded'
      onClick={() => axios.get(process.env.REACT_APP_API_Projects, { withCredentials: true})}
      >
        here
      </button> */}
    <button className='flex items-center justify-center font-lato
    bg-[#0000000b] p-[0.4em] rounded-xl whitespace-pre'
    onClick={ () => setEditThisUserModal(true) }
    >
        <Avatar 
        className='antialiased mr-2'
        {...stringAvatar(name, 23, 23, '0.7em')} 
        />    
        {name} 
    </button>

    </div>
  )
}

export default UserInfo
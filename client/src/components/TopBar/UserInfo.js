import { Avatar } from '@mui/material'
import React from 'react'
import { AuthContexts } from '../../App/Auth'
import { TeamContexts } from '../../contexts/TeamContexts';
import stringAvatar from '../utils/UserAvatar/StringAvatar';

function UserInfo() {
    const { user } = AuthContexts();
    const { Users } = TeamContexts();
    const loggedInUser = Users.filter(u => u._id === user.user)[0];
    const name = loggedInUser.firstName + ' ' + loggedInUser.lastName;
  return (
    <div className='absolute top-0 right-0 mr-[2em] mt-[1.5em]'>
    <div className='flex items-center justify-center font-lato
    bg-[#0000000b] p-[0.4em] rounded-xl whitespace-pre
    '>
        {'Welcome,    '}
        <Avatar 
        className='antialiased mr-2'
        {...stringAvatar(name, 23, 23, '0.7em')} 
        />    
        {name} 
    </div>

    </div>
  )
}

export default UserInfo
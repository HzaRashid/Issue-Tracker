import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import { AuthContexts } from '../../../App/Auth';
import { TeamContexts } from '../../../contexts/TeamContexts';
import axios from 'axios';
import { IssueContexts } from '../../../contexts/IssueContexts';

  const commentStyle = {
    class1:`font-lato tracking-wide 
    antialiased w-[23.5em] bg-[#00000006]
    border-b-[0.05em] truncate rounded-sm
    whitespace-pre-line outline-none
    font-normal text-[0.8em] my-1
    placeholder:text-[#404040] hover:bg-[#e2e2e2]
    p-1 h-auto max-h-[5em] overflow-x`,

    class2:`font-lato tracking-wide 
    antialiased w-[23.5em] bg-[#00000006]
    border-b-[0.05em] truncate rounded-md
    whitespace-pre-line outline-none
    font-normal text-[0.8em] my-1
    placeholder:text-[#404040] 
    p-1 h-auto max-h-[5em] overflow-x`
  }

function Create() {

  const [ Focus, setFocus ] = useState(false);
  const [ Comment, setComment ] = useState('');
  const [ IsCmntEmpty, setIsCmntEmpty ] = useState(true);
  const { user } = AuthContexts();
  const { SelectedIssue } = IssueContexts();
  // console.log(SelectedIssue)
  // console.log(user.user);
  const { Users } = TeamContexts();
  const loggedInUser = Users.filter(u => u?._id === user?.user)[0]
  return (
    <> 
    <div
    className='flex items-center justify-center mt-2 font-lato mb-2'
    >
    
  <div className='flex items-center antialiased space-x-2 drop-shadow-sm'> 
  <Avatar {...stringAvatar(loggedInUser.firstName + ' ' + loggedInUser.lastName, 22, 22, '0.4em')}  />

    {
      Focus ? 
      <>
      <ul> 
      <li>
      <textarea
      autoFocus
      className={commentStyle.class2}
      // onBlur={() => setFocus(false)}
      value={Comment}
      onChange={(e) => {
        setComment( e.target.value );
        setIsCmntEmpty(!(e.target.value.replace(/\s/g, '').length > 0));
      }}
      >
      </textarea>
      </li>
      
      <div className='text-[0.75em] space-x-4 flex justify-end'>
      <button 
      onClick={() => { 
        setFocus(false); 
        setComment(''); 
        setIsCmntEmpty(true)
      }}
      >
        Cancel
      </button>
      <button 
      className={`${IsCmntEmpty ? 
        'text-[#b6b6b6]' : 'text-[#505050]'}`}
        onClick={() => { 
          if (!IsCmntEmpty) {
            axios.post(process.env.REACT_APP_API_WriteComment, {
              comment:   Comment,
              createdBy: loggedInUser._id,
              issue:     SelectedIssue._id
            }, { withCredentials: true })
            setFocus(false); 
            setComment(''); 
            setIsCmntEmpty(true)

          }
      }}
      >
        Post
      </button>


      </div>
      </ul>
      </>
      :
      <>
      <input 
      type='text' 
      placeholder={Comment || 'Add a comment..' }
      className={commentStyle.class1 + `hover:bg-[#e2e2e2]`}
      onClick={() => setFocus(true)}
      >

      </input>

      </>
    }

    

  
  


  </div>



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
      width:22, 
      height:22,
      

    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

export default Create
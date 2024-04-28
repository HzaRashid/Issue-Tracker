import React, { useEffect } from 'react'
import Index from '../components/IssuesPage/Index'
import { useStateContext } from '../contexts/ContextProvider';
import { useLocation } from 'react-router-dom';
import { TeamContexts } from '../contexts/TeamContexts';
import axios from 'axios';

function Issues() {
  const { nav, ProjectNav } = useStateContext();
  const { Users, setUsers } = TeamContexts()
  const currLoc = useLocation();

  useEffect(() => {
    if (!Users.length) {
      axios.get(process.env.REACT_APP_API_getUsers, 
        { withCredentials: true })
      .then(res => { 
          if (res.status === 200) setUsers(res.data); 
          // console.log(res.data)
        })
        .catch(err => {
          // console.log(err)
        })
    } // eslint-disable-next-line
  }, [])
  return (

    <div 
    className={`
    ${
      nav ? 'ml-[12rem]' : 'ml-[4.25rem]'
    } 
    body-font font-lato ease-in-out duration-[.15s] w-[10]`
    }
    >

    <div className={`
      ${
        ProjectNav ? 
        'ml-[12rem]' : 'ml-[0]'
      }
      ease-in-out duration-[0.15s] `
      }
    >
    <div className='absolute mt-[1rem] ml-[2rem] text-[1.2em] text-[#4e779f]'>
    <button className='font-light z-20'>
    {currLoc.pathname === "/issues" && currLoc.pathname}
    </button>
    </div>


    <Index/>

    </div>
    </div>

  )
}

export default Issues
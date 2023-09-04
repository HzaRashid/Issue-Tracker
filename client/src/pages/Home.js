import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import CurrentWork from '../components/Home/CurrentWork';
import { useStateContext } from '../contexts/ContextProvider';
import axios from 'axios';
import { IssueContexts } from '../contexts/IssueContexts';
import { TeamContexts } from '../contexts/TeamContexts';
import { SprintContexts } from '../contexts/SprintContexts';

function Home() {
  const { nav, ProjectNav } = useStateContext();
  
  const { Issues, setIssues } = IssueContexts();
  const { setUsers, Users } = TeamContexts();
  const { Sprints, setSprints } = SprintContexts();
  useEffect(() => {
    if (
      !Issues?.length ||
      !Users?.length ||
      !Sprints?.length
    ) {
      const withCreds = { withCredentials: true };
      axios.all([
        axios.get(process.env.REACT_APP_API_Issues, withCreds), 
        axios.get(process.env.REACT_APP_API_getUsers, withCreds),
        axios.get(process.env.REACT_APP_API_Sprints, withCreds)
      ])
      .then(axios.spread((res1, res2, res3) => {
                setIssues(res1.data);
                setUsers(res2.data);
                setSprints(res3.data);
      }));
      } // eslint-disable-next-line
    }, [])

  const currLoc = useLocation();

  return (
    <>

    <div 
    className={`
    ${
      nav ? 'ml-[12rem]' : 'ml-[4.25rem]'
  } 
  body-font font-lato ease-in-out duration-[.3s] w-[10]`
  }
    >

<div className={`
        ${
          ProjectNav ? 
          'ml-[12rem]' : 'ml-[0]'
        }
        ease-in-out duration-[0.2s] `
          }
        >

    <div className='absolute mt-[1rem] ml-[2rem] text-[1.2em] text-[#4e779f]'>
    <button className='font-light z-20'>
    {currLoc.pathname === "/home" && currLoc.pathname}
    </button>
    </div>
    <CurrentWork/>

    </div>
    </div>
    
    
    </>
  )
}

export default Home
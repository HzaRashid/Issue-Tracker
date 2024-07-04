import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import CurrentWork from '../components/Home/CurrentWork';
import { useStateContext } from '../contexts/ContextProvider';
import axios from 'axios';
import { IssueContexts } from '../contexts/IssueContexts';
import { TeamContexts } from '../contexts/TeamContexts';
import { SprintContexts } from '../contexts/SprintContexts';
import { ProjContexts } from '../contexts/ProjectContexts';

function Home() {
  const { nav, ProjectNav } = useStateContext();
  const { setUsers, Users } = TeamContexts();
  const { Issues, setIssues, TableIssues, setTableIssues } = IssueContexts();
  const { Projects, setProjects } = ProjContexts();
  const { Sprints, setSprints } = SprintContexts();

  // useEffect(() => {
  //   axios.get(process.env.REACT_APP_API_IssuesTable, {withCredentials: true})
  //   .then(res => setTableIssues(res.data))}, [])

  useEffect(() => {
    if (
      !Issues?.length ||
      !Users?.length ||
      !Projects?.length ||
      !Sprints?.length
    ) {
      const withCreds = { withCredentials: true };
      axios.all([
        axios.get(process.env.REACT_APP_API_IssuesTable, withCreds),
        axios.get(process.env.REACT_APP_API_getUsers, withCreds),
        axios.get(process.env.REACT_APP_API_Projects, withCreds),
        axios.get(process.env.REACT_APP_API_Sprints, withCreds),
      ])
      .then(axios.spread((res1, res2, res3, res4) => {
                setTableIssues(res1.data)
                setIssues(
                  res1.data.map(i => ({...i, assignedTo: i.assignedTo._id, project: i.project._id}))
                )
                
              
                setUsers(res2.data);
                setProjects(res3.data);
                setSprints(res4.data);
                // 
      }));
      } // eslint-disable-next-line
    }, [])

  const currLoc = useLocation();
  // console.log(TableIssues)
  return (
    <>

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
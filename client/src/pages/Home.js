import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import CurrentWork from '../components/Home/CurrentWork';
import { useStateContext } from '../contexts/ContextProvider';
import { SprintContexts } from '../contexts/SprintContexts';
import axios from 'axios';
import { IssueContexts } from '../contexts/IssueContexts';
const data = require('../pages/routes.json')

function Home() {
  const { nav, ProjectNav } = useStateContext();
  const { setSprints } = SprintContexts();
  const { setIssueVersions } = IssueContexts();
  useEffect(() => {
    axios.get(
      data.Sprints
    )
    .then(res => setSprints(res.data))
    .catch(err => console.log(err))
    // eslint-disable-next-line
    }, [])
    useEffect(() => {
      axios.get(
        data.IssueVersions
      )
      .then(res => setIssueVersions(res.data))
      .catch(err => console.log(err))
      // eslint-disable-next-line
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
    {currLoc.pathname}
    </button>
    </div>
    <CurrentWork/>
    </div>
    </div>
    
    
    </>
  )
}

export default Home
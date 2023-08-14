import React from 'react'
import Index from '../components/IssuesPage/Index'

import { useStateContext } from '../contexts/ContextProvider';
import { useLocation } from 'react-router-dom';

function Issues() {
  const { nav, ProjectNav } = useStateContext();
  const currLoc = useLocation();
  return (
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
    <button className='font-normal z-20'>
    {currLoc.pathname}
    </button>
    </div>


    <Index/>

    </div>
    </div>
  )
}

export default Issues
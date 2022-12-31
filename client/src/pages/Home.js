import React from 'react'
import { useLocation } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';

function Home() {
  const { nav, ProjectNav } = useStateContext();

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

    <div className='fixed mt-[1rem] ml-[2rem] text-[1.2em] text-[#4e779f]'>
    <button className='font-light'>
    {currLoc.pathname}
    </button>
    </div>
    </div>
    </div>
    
    
    </>
  )
}

export default Home
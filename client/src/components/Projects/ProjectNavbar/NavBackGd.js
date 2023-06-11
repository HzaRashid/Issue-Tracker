import React, { useEffect, useState } from 'react'
import '../../../index.css'
// import "./ProjectNav.css"
import "./NavBack.css"

import { CustomTooltip } from '../../CustomTooltip'
import { useStateContext } from '../../../contexts/ContextProvider';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { useLocation, useNavigate } from 'react-router-dom';

import SwitchBtn from './SwitchBtn'
import SelectedProjNav from '../SelectedProjNav/SelectedProjNav';
import ProjectNavbar from './ProjectNavbar';
import SwapProjNavVertical from './SwapProjNavVertical';
import { SprintContexts } from '../../../contexts/SprintContexts';


function NavBackGd( props ) {
  const currLocation = useLocation();
  let goToPage = useNavigate();
  const { showSprints, setShowSprints } = SprintContexts();

  const isProjPage = currLocation.pathname
  .includes('proj-nav=true')

    const { 
        nav,
        //  setNav,
        ProjectNav, setProjectNav, 
        SwapProjNav,setSwapProjNav
       } = useStateContext();

    const { children } = props

    useEffect(() => setSwapProjNav(!isProjPage), []) 
    // console.log(isProjPage)

  return (
    <> 
    <div 
    className={`
    ${
      nav ? 'ml-[12rem]' : 'ml-[4.5rem]'
  } 
     ease duration-[0.3s]`
  }
    >
    <div>

    <div 
    className={`project-sidebar`}
    style={{
      width: ProjectNav ? '12em' : !ProjectNav && SwapProjNav ? '0em' : '3em',
      transition: 'width 0.2s ease-in-out'
    }}
    >
    <CustomTooltip title={ProjectNav ? 'Close' : 'Open'} placement='right' arrow>
      <button 
      className='hover:bg-[#7895B3] bg-[#f0f0f0] hover:text-[#e2e2e2] text-[#404040]' 
      onClick={() => {setProjectNav(!ProjectNav); if (ProjectNav) setShowSprints(false)}}
      style={{
        marginLeft: ProjectNav ? '11.15em' : !ProjectNav && SwapProjNav ? '-3em' : '2em',
        position: 'fixed',
        marginTop: '2.4em',
        borderRadius: '1em',
        border: '0.05em solid #0000001a',
        padding: '0.1em',
        transition: 'all 0.2s ease-in-out',
        zIndex: '5'
        
      }}
      >
      { ProjectNav ? 
       <BiChevronLeft fontSize={'1.4em'}/> : <BiChevronRight fontSize={'1.4em'}/>
      }
      </button>      
      </CustomTooltip>

 
    {SwapProjNav ? <ProjectNavbar/> : <SelectedProjNav showSprints={showSprints} setShowSprints={setShowSprints}/>}
    <div 
    style={{
      visibility: ProjectNav ? 'visible' : 'hidden',
      opacity:    ProjectNav ? '1' : '0',
      transition: ProjectNav ? 'visibility 0.5s, opacity 0.5s' 
                             : 'visibility 0.1s, opacity 0.1s'
    }}
    > 
    <SwitchBtn/>
    
    </div>
    {!SwapProjNav && 
    <div className='flex justify-center items-center mt-[-3.65em]'
    style={{
      visibility: !ProjectNav ? 'visible' : 'hidden',
      opacity:    !ProjectNav ? '1' : '0',
      transition: !ProjectNav ? 'visibility 0.5s, opacity 0.5s' 
                              : 'visibility 0.1s, opacity 0.1s'
    }}
    >
    <SwapProjNavVertical 
    enabled={SwapProjNav}
    setEnabled={setSwapProjNav} 
    setProjectNav={setProjectNav}
    />
    </div>
    }
  </div>
  </div>
  </div>
  </>
  
  )}

export default NavBackGd
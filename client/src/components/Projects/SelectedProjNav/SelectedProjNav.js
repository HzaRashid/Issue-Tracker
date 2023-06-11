import React, { useState } from 'react'
import { useStateContext } from '../../../contexts/ContextProvider'
import { ProjContexts } from '../../../contexts/ProjectContexts';
import { CustomTooltip } from '../../CustomTooltip'
import './SelectedProjNav.css'
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { BsChevronDown } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { NavItems } from './NavItems';
import SprintList from './SprintList';
import SwapProjNav from '../ProjectNavbar/SwapProjNav';
import SwapProjNavVertical from '../ProjectNavbar/SwapProjNavVertical';
import NavBackGd from '../ProjectNavbar/NavBackGd';
// import { SprintContexts } from '../../../contexts/SprintContexts';




function SelectedProjNav( props ) {
    const { nav,setNav, ProjectNav, setProjectNav  } = useStateContext();
    const { SelectedProj } = ProjContexts();
    // const { SelectedSprint, setSelectedSprint } = SprintContexts();
    // eslint-disable-next-line
    let goToPage = useNavigate();

    const navItems = NavItems();

    const { showSprints, setShowSprints } = props;

  return (
    

<>

      <div 
      className='mt-[2.15em] ml-[0.75em] font-normal font-lato text-[#404040] text-[1.15em]'
      style={{
        // width: ProjectNav ? '12em' : '2em',
        position: 'absolute',
        visibility: ProjectNav ? 'visible' : 'hidden',
        opacity: ProjectNav ? '1' : '0',
        transition: 'all 0.2s ease-in-out',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }}
      >
        {SelectedProj?.title}
      </div>

      <ul className='mt-[5.5em] flex  flex-col h-[80%]'>
        {
          navItems.map(
            (item, key) => (
              <li key={key}> 
              <CustomTooltip 
              title={ProjectNav ? '' : item.title} 
              placement='right' 
              arrow
              >
              <div 
              key={key} 
              className='flex items-center p-[0.5em]
              text-[#404040] font-lato font-normal 
              hover:bg-[#c8e0f048] rounded-md hover:cursor-pointer'
              style={{
                transition: 'all 0.2s ease-in-out',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
              onClick={() => {
                

                if (item.title === 'Board') {
                  setProjectNav(true)
                  setShowSprints(!showSprints)
                  return
                }

                goToPage(item.link)
              }
            }
              >
                <div className='ml-[0.3em]'>{item.icon}</div>
                <div className='ml-[0.6em] truncate'>{item.title}</div>
                { item.title==='Board' &&
                <>
                <div className={`${showSprints ? 'rotate-180' : 'rotate-0'} ml-[4.5em]
                ease-in-out duration-100`}> 
                     <BsChevronDown/> 
                </div>
                  </>
                }
              </div>
              </CustomTooltip>
              {  
                item.title==='Board' &&
                <div> 
                <SprintList 
                showSprints={showSprints} 
                SelectedProj={SelectedProj} 
                goToPage={goToPage}
                />
                </div>
              }
              </li>
            )
          )
        }

          {/* <SwapProjNav ProjectNav={ProjectNav}/> */}


      </ul>

      

</>




   
  )
}

export default SelectedProjNav
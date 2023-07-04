import React, { useEffect } from 'react'
import '../../../index.css'
import "./NavBack.css"
import { CustomTooltip } from '../../CustomTooltip'
import { useStateContext } from '../../../contexts/ContextProvider';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { useLocation } from 'react-router-dom';
import ProjectNavbar from './ProjectNavbar';


function NavBackGdDefault( props ) {
  const currLocation = useLocation();
  // let goToPage = useNavigate();
  const isProjPage = currLocation.pathname
  .includes('proj-nav=true')


    const { 
        nav,
        //  setNav,
        ProjectNav, 
        setProjectNav, 
        // SwapProjNav,
        setSwapProjNav
       } = useStateContext();
    // const { children } = props
    // eslint-disable-next-line
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
      width: ProjectNav ? '12em' : '0em',
      transition: 'width 0.2s ease-in-out'
    }}
    >


      {/* <div className='all-top'>
      <div className='flex items-center justify-between pt-[1em] pb-[1.25em]'></div>


      { children }
      </div> */}
    <div
    style={{
        visibility: ProjectNav  ? 'visible' : 'hidden',
        opacity:    ProjectNav ? '1'       : '0',
        transition: ProjectNav ? '0.4s' : '0.1s'
    }}
    > 
    <ProjectNavbar/>
    </div>

      </div>

      <CustomTooltip title={ProjectNav ? 'Close' : 'Open'} placement='right' arrow>
      <button 
      className='hover:bg-[#7895B3] bg-[#f0f0f0] hover:text-[#e2e2e2] text-[#404040]' 
      onClick={() => setProjectNav(!ProjectNav)}
      style={{
        marginLeft: ProjectNav ? '11.15em' : '-2em',
        position: 'fixed',
        marginTop: '2.4em',
        borderRadius: '1em',
        border: '0.05em solid #0000001a',
        padding: '0.1em',
        transition: 'all 0.2s ease-in-out',
        zIndex: 5
        
      }}
      >
      { ProjectNav ? 
       <BiChevronLeft fontSize={'1.4em'}/> : <BiChevronRight fontSize={'1.4em'}/>
      }
      </button>      
      </CustomTooltip>
      
      </div>
      
      
      </div>
</>
  
  )}

export default NavBackGdDefault
import React, {   } from 'react'
import { AiOutlineLeft, AiOutlineLogout, AiOutlineRight } from "react-icons/ai";
import { NavItems } from './NavItems';
import "./Nav.css"
import "../../index.css"

import { styled } from '@mui/material/styles';

import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { CustomTooltip } from '../CustomTooltip';

import { useLocation, useNavigate } from 'react-router-dom';
import { useStateContext } from '../../contexts/ContextProvider';
// eslint-disable-next-line
// import ProjectNavbar from '../Projects/ProjectNavbar/ProjectNavbar';
// import SelectedProjNav from '../Projects/SelectedProjNav/SelectedProjNav';
import NavBackGd from '../Projects/ProjectNavbar/NavBackGd';
import NavBackGdDefault from '../Projects/ProjectNavbar/NavBackGdDefault';
import { SprintContexts } from '../../contexts/SprintContexts';
// import { ProjContexts } from '../../contexts/ProjectContexts';
import stringAvatar from '../utils/UserAvatar/StringAvatar';
import { Avatar, Divider } from '@mui/material';
import { AuthContexts } from '../../App/Auth';
import { TeamContexts } from '../../contexts/TeamContexts';
import { BiRightArrow } from 'react-icons/bi';


const MenuTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#000',
    color: 'white',
    maxWidth: 220,
    fontSize: '1em',
    FontFace: "'lato', sans-serif;",
    fontWeight: 300,
  },
  [`& .${tooltipClasses.arrow}`]:{
    color: '#000'
  }
}));


function Nav() {

  const currLocation = useLocation();
  let goToPage = useNavigate();

  const { 
    nav, setNav,
    ProjectNav, setProjectNav,
    ScreenWidth, 
    // SwapProjNav, 
    // setSwapProjNav
   } = useStateContext();
   const { 
    // showSprints, 
    setShowSprints } = SprintContexts();
    const { LoggedInUser } = AuthContexts()

  //  const { SelectedProj } = ProjContexts();

  const { setEditThisUserModal } = TeamContexts()


  
   const isMobile = ScreenWidth < 768;
  // const closeNavStyle = { color: "#4a4a4a", fontSize: "2em"};
  const isProjPage = currLocation.pathname
  .includes('proj-nav=true')
  // console.log(SelectedProj)
  return (
  <>
  <div 
  className='sidebar'
  style={{
    width: !nav ? '4.5rem' : (isMobile && nav) ? '100vw' : '12rem',
    zIndex: 20,
}}
  >
    <div 
    className='top'
    >
      <button onClick={() => goToPage('/')}
            style={{
              visibility: nav ? 'visible' : 'hidden',
              transition: '0.1s',
              fontWeight: 300
            }}
      >
      <h1 
      className='appName'
      style={{
        visibility: nav ? 'visible' : 'hidden',
        transition: '0.1s',
        fontWeight: 400
      }}
      >
        Flow
      </h1>
      </button>



      <CustomTooltip title={nav ? 'Close' : 'Open'}>
      <button 
      className='menuIcon' 
      onClick={() => setNav(!nav)}
      style={{
        // marginLeft: nav ? '2em' : '-2.45em',
        marginLeft: !nav ? '-2.45em' : (isMobile && nav) ? '77.5%' : '2em'
        
      }}
      >
      { nav ? 
       <AiOutlineLeft  /> : <AiOutlineRight />
      }
      
      </button>      
      </CustomTooltip>

    </div>

    {
      NavItems.map(
        (item, key) => {
          
          if (item.title.toLowerCase() !== 'profile') return (
          <div key={key}>
          <MenuTooltip title={nav ? '' : item.title} placement='right' arrow>
          <li
          className='row'
          id={
            (
              (currLocation.pathname === item.link) ||
                ( 
                currLocation
                .pathname
                .includes('/projects') && 
                item.title === 'Projects'
                ) 
              ) ? 
            'active' : 'idle'
          }
          onClick={() => {
            if (item.title==='Projects') {
              setProjectNav(!ProjectNav);
              setShowSprints(false);
              if (isMobile) setNav(false);
              return
            }
            goToPage(item.link);
            setNav(false)
            }}
          > 
          <div className='icon' 
          style={{
            color: currLocation.pathname === item.link ? '#fff' : '#f0f0f0',
            
          }}
          >
            {item.icon}
          </div>
          {
          item.title.toLowerCase() === 'projects' && ProjectNav &&
          <div className={`${nav ? 'ml-[8em]' : 'ml-[1.7em]'} 
          absolute z-50 text-[#d48c98] transition-all duration-200 ease-in-out`}
          >  
          <BiRightArrow className='text-[1em]' />
          </div>  
          } 
          <div 
          className='title'
          style={{
            visibility: nav ? 'visible' : 'hidden',
            fontWeight: 400
          }}
          >
            {item.title}
          </div> 

          </li>
          </MenuTooltip>

          </div>
          
        );

        else return (
        <div key={key}>  
        <>
        <Divider sx={{ background: '#20212236'}}/>
        <Divider sx={{ background: '#20212236'}}/>
        {/* <div className={`${nav ? 'bg-[#00000053]' : ''} rounded p-1 mt-[1em] transition-all duration-200 ease-in-out`}>  */}
        <div className='rounded p-1 mt-[3em] 
        //  text-[#20212236]
        transition-all duration-200 ease-in-out'> 
        <div className={`${nav ? '' : ''}
        flex items-center justify-center transition-all duration-200 ease-in-out
        text-[#e2e2e2]  hover:cursor-pointer p-2 hover:bg-[#00000038]`}
        onClick={() => {
          setEditThisUserModal(true)
        }}
        >
        <div className='hover:cursor-pointer'> 
        <Avatar 
        className='hover:bg-[#00000038]'
            {...stringAvatar(
              LoggedInUser?.firstName + ' ' + LoggedInUser?.lastName,
              36, 
              36, 
              '0.875em'
              )
            }  
            />
        <div className='flex items-center justify-center mt-1'> 
        <p className='text-[0.5em] text-[#f0f0f0] font-normal '> Edit </p>
        </div>
        </div>
        </div>

        <div className='flex items-center justify-center 
        space-x-8 mt-2 text-[1.2em] '
        >
         
          <button className='w-[3em] p-1 hover:bg-[#00000038]
          text-[#eaeaea] font-normal rounded-lg
          transition-all duration-100 ease-in-out'
          style={{
            visibility: nav ? 'visible' : 'hidden',
            opacity:    nav ? '1'       : '0'
          }}
          >
            <AiOutlineLogout className='ml-[0.8em]'/>
            <p className='text-[0.5em]'>Log out </p>
          </button>
   
          </div>
        
        
        </div>
        </>
        </div>)

        


      })
    }
    
  </div>
  {isProjPage ?
  <> 
  {/* <div style={{
    visibility: ProjectNav  ? 'visible' : 'hidden',
    opacity:    ProjectNav ? '1'       : '0',
    transition: ProjectNav ? '0.4s' : '0.2s'
  }}>  */}
  <div> 
  <NavBackGd/>
  </div>
  {/* </div> */}
  </> 
  : 
  // <div style={{
  //   visibility: ProjectNav  ? 'visible' : 'hidden',
  //   opacity:    ProjectNav ? '1'       : '0',
  //   transition: ProjectNav ? '0.4s' : '0.1s'
  // }}> 
  <div style={{ zIndex: 50 }}> 
  <NavBackGdDefault/>
   </div>
  }


  </>
);

}

export default Nav;
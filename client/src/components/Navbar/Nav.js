import React from 'react'
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { NavItems } from './NavItems';
import "./Nav.css"
import "../../index.css"

import { styled } from '@mui/material/styles';

import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { CustomTooltip } from '../CustomTooltip';

import { useLocation, useNavigate } from 'react-router-dom';
import { useStateContext } from '../../contexts/ContextProvider';
// eslint-disable-next-line
import ProjectNavbar from '../Projects/ProjectNavbar/ProjectNavbar';
import SelectedProjNav from '../Projects/SelectedProjNav/SelectedProjNav';
import { ProjContexts } from '../../contexts/ProjectContexts';



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
    ScreenWidth
   } = useStateContext();

   const { SelectedProj } = ProjContexts();


   const isProjectPage = currLocation.pathname
  .includes(SelectedProj?.title?.replace(' ', '%20'))
  
   const isMobile = ScreenWidth < 768;
  // const closeNavStyle = { color: "#4a4a4a", fontSize: "2em"};
  return (
  <>
  <div 
  className='sidebar'
  style={{
    width: !nav ? '4.5rem' : (isMobile && nav) ? '100vw' : '12rem'
    ,
    zIndex: 20
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
        fontWeight: 300
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
          return (

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
                ) ||
                (ProjectNav && item.title === 'Projects')
              ) ? 
            'active' : 'idle'
          }
          onClick={() => {
            if (item.title==='Projects') {
              setProjectNav(!ProjectNav)
              if (isMobile) setNav(false)
              return
            }

            goToPage(item.link);
            setNav(false)
            }}
        
          > 

          <div className='icon'>
            {item.icon}
          </div>
          
          <div 
          className='title'
          style={{
            visibility: nav ? 'visible' : 'hidden',
            fontWeight: 300
          }}
          >
            {item.title}
          </div> 

          </li>
          </MenuTooltip>
          </div>
          

        );
      }

      )
    }
    
  </div>

  { 
  isProjectPage ?  
  <SelectedProjNav/> : <ProjectNavbar/> 
  }

  </>
);

}

export default Nav;
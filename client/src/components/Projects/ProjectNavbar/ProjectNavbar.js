import React, { useState, useEffect } from 'react'
import "./ProjectNav.css"
import '../../../index.css'
import { AiOutlinePlus } from 'react-icons/ai';
import { IoIosOpen } from "react-icons/io";
import { BiChevronLeft, BiChevronRight }  from "react-icons/bi";
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useStateContext } from '../../../contexts/ContextProvider';
import { ProjContexts } from '../../../contexts/ProjectContexts';
import { CustomTooltip } from '../../CustomTooltip';
import Axios from 'axios'
const data = require('../../../pages/routes.json');


function ProjectNavbar() {

  // eslint-disable-next-line
  const currLoc = useLocation();
  let goToPage = useNavigate();

  const { 
    nav, setNav,
    ProjectNav, setProjectNav,
   } = useStateContext();

   const {
    Projects, setProjects,
    setSelectedProj,
    setProjModal
  } = ProjContexts();

   const [Search, setSearch] = useState('');

   useEffect( () => { Axios.get(data.Projects)
    .then( 
      response => setProjects(response.data) 
      // eslint-disable-next-line
      )}, [])
      


  return (
    <>
    <div 
    className={`
    ${
      nav ? 'ml-[12rem]' : 'ml-[4.5rem]'
  } 
     ease duration-[0.3s] `
  }
    >
    <div 
       >

    <div 
    className='project-sidebar'
    style={{
      width: ProjectNav ? '12em' : '0em',
      transition: 'width 0.2s ease-in-out'
    }}
    >
      <div className='all-top'>
      <div className='flex items-center justify-between pt-[1em] pb-[1.25em]'>

      </div>

      <div className='search-add'>
      <input 
      className='search-bar' 
      type='text'
      placeholder='Search..'
      onChange={(event) => setSearch(event.target.value)}
      >
      </input>

      <div className='flex items-center justify-between' > 

      <CustomTooltip 
      title='Create Project' 
      arrow
      >
      <button 
      className='flex items-center hover:bg-[#e5e5e5] 
      ml-[0.475em] p-1 rounded-md font-lato text-[#2a2a2a] w-[85%]' 
      onClick={
        () => {
          // setProjectNav(false);
          // setNav(false);
          setProjModal(true);
        }
      }
      >
        <AiOutlinePlus color='#2a2a2a' fontSize={'1.2em'}/> 
        <div className='ml-[0.3em] font-light'>Add</div>
      </button>  
      </CustomTooltip>

      <CustomTooltip title='Open Page' arrow>
      <button 
      className='ml-[0.75rem] drop-shadow-sm
      transition ease-in-out delay-50 mr-4
      hover:-translate-y-1 hover:scale-105 duration-150'
      onClick={
        () => {
          setProjectNav(false);
          setNav(false);
          goToPage('/projects')
        }
      }
      >
        <IoIosOpen color='#505050' fontSize={'1.4em'} />
      </button>  
      </CustomTooltip>
    </div>
      </div>
      </div>

      <ul className='mt-[1em]'>
      {
        Projects
        .filter( // eslint-disable-next-line
          (item) => {
            if (Search===''){
              return item
            } else if
            (item.title.toLowerCase()
            .includes(Search.toLowerCase())
            ) {
              return item
            }
            
          }
          )
          .map(
          (item, key) => 
          (

            <div key={key}>
            <Link
            to={`/projects/${item.title}/backlog/proj-nav=true`}
            key={key} 
            className='project-row'
            onClick={
              () => {
                setProjectNav(false);
                setSelectedProj(item);

              }}
              id={
                (currLoc.pathname.replace('%20', ' ') === `/projects/${item.title}/backlog/proj-nav=true`)
                ?
                'ProjOn' : 'ProjOff'
            }
            > 
            <button className='project-title'>{item.title}</button>
            </Link>
            </div>
          )
        )
      }
    </ul>
    </div>
    <CustomTooltip title={ProjectNav ? 'Close' : 'Open'} placement='right' arrow>
      <button 
      className='hover:bg-[#7895B3] bg-[#f0f0f0] hover:text-[#e2e2e2] text-[#404040]' 
      onClick={() => setProjectNav(!ProjectNav)}
      style={{
        marginLeft: ProjectNav ? '11.15em' : '-2em',
        position: 'absolute',
        marginTop: '2.4em',
        borderRadius: '1em',
        border: '0.05em solid #0000001a',
        padding: '0.1em',
        transition: 'all 0.2s ease-in-out',
        
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
  )
}

export default ProjectNavbar
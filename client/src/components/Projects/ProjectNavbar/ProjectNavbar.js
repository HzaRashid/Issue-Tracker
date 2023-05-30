import React, { useState, useEffect } from 'react'
import "./ProjectNav.css"
import '../../../index.css'
import { AiOutlinePlus } from 'react-icons/ai';
import { IoIosOpen } from "react-icons/io";

import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useStateContext } from '../../../contexts/ContextProvider';
import { ProjContexts } from '../../../contexts/ProjectContexts';
import { CustomTooltip } from '../../CustomTooltip';
import Axios from 'axios'

import NavBackGd from './NavBackGd';
const data = require('../../../pages/routes.json');


function ProjectNavbar( props ) {

  // eslint-disable-next-line
  const currLoc = useLocation();
  let goToPage = useNavigate();
  const { isProjPage } = props;

  const { 
    setNav,
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
      

  console.log(ProjectNav)
  return (
    <>

    <div className='all-top'>




      
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

      <ul> 
        <li> 
      <ul className='mt-[1em] h-auto max-h-[60vh] overflow-scroll'>
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
    </li>
    <li className='mt-[-4.075em]'> 

    </li>
    </ul>
    </div>



  
  </>
  )
}

export default ProjectNavbar
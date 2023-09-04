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
import { MdEdit } from 'react-icons/md';

// import NavBackGd from './NavBackGd';
const data = require('../../../pages/routes.json');


function ProjectNavbar( props ) {

  // eslint-disable-next-line
  const currLoc = useLocation();
  let goToPage = useNavigate();
  // const { isProjPage } = props;

  const { 
    setNav,
    // ProjectNav, 
    setProjectNav,
    
   } = useStateContext();

   const {
    Projects, setProjects, 
    setSelectedProjModal, EditProj, 
    setProjModal, setEditProjModal, setEditProj
  } = ProjContexts();

   const [Search, setSearch] = useState('');

   useEffect( () => { 
    if (!Projects?.length) Axios.get(process.env.REACT_APP_API_Projects, { withCredentials: true })
    .then( 
      response => setProjects(response.data) 
      // eslint-disable-next-line
      )}, [
        // EditProj
      ])
      

  // console.log(ProjectNav)
  return (
    <>

    <div className='all-top'>




      
      <div className='search-add'>
      <input 
      id="proj-nav-search-bar"
      className='proj-nav-search-bar' 
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
          setEditProj(false)
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

            <div key={key} >
            <Link
            to={`/projects/${item.title}/backlog/proj-nav=true`}
            key={key} 
            className='project-row'
            onClick={
              () => {
                setProjectNav(false);
                setSelectedProjModal(item);

              }}
              id={
                (currLoc.pathname.replace('%20', ' ') === `/projects/${item.title}/backlog/proj-nav=true`)
                ?
                'ProjOn' : 'ProjOff'
            }
            > 
            
            <button className='project-title'>{item.title}</button>
            
            <div className='flex w-[100%] justify-end'> 
            <button onClick={(e) => {
              e.preventDefault();
              e.stopPropagation(); 
              setEditProjModal(true); 
              setEditProj(true);
              setSelectedProjModal(item);
              console.log('flog')
              }}
              > 
              <MdEdit 
              className='p-1 text-[1.45em] text-[#505050]
              hover:bg-[#304669] rounded-md 
              hover:text-[#eaeaea]'
              
              />
              </button>
            </div>

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


// {
//   "_id": {
//     "$oid": "62bcbc84f356c127c05c1708"
//   },
//   "key": "PRO-1",
//   "title": "Project 1",
//   "type": "Scrum",
//   "assignedTo": [
//     "all"
//   ],
//   "sprints": [
//     {
//       "$oid": "62d2e7af32f4e69c0b0d0360"
//     },
//     {
//       "$oid": "62d3182d2791577eb46f660c"
//     }
//   ],
//   "startDate": {
//     "$date": "2022-07-07T00:00:00.000Z"
//   },
//   "endDate": {
//     "$date": "2022-08-07T00:00:00.000Z"
//   },
//   "createdAt": {
//     "$date": "2022-06-29T20:56:36.000Z"
//   },
//   "__v": 0,
//   "backlog": [
//     {
//       "$oid": "62db18b556554478b77e2c3a"
//     },
//     "62d1d7bfe6bde173799fd497",
//     "62d218c47b614e5221809f2f",
//     "62d219177b614e5221809f32",
//     "62d2c692663259ff3eae8f4d",
//     "62d2c756663259ff3eae8f50",
//     "62d73d921393f573f1fa6722"
//   ]
// }
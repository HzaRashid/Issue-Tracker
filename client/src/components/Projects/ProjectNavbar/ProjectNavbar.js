import React, { useState, useEffect } from 'react'
import "./ProjectNav.css"
import '../../../index.css'
import { AiOutlinePlus } from 'react-icons/ai';
import { useLocation, Link } from 'react-router-dom';
import { useStateContext } from '../../../contexts/ContextProvider';
import { ProjContexts } from '../../../contexts/ProjectContexts';
import { CustomTooltip } from '../../CustomTooltip';
import Axios from 'axios'
import { MdEdit } from 'react-icons/md';


function ProjectNavbar( props ) {

  // eslint-disable-next-line
  const currLoc = useLocation();

  const { 
    // setNav,
    // ProjectNav, 
    setProjectNav,
    
   } = useStateContext();

   const {
    Projects, 
    setProjects, 
    setSelectedProjModal, 
    // EditProj, 
    setEditProj,
    setProjModal, 
    setEditProjModal, 

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
      ml-[0.475em] p-1 rounded-md font-lato text-[#2a2a2a] w-[90%]' 
      onClick={
        () => {
          setProjModal(true);
          setEditProj(false)
        }
      }
      >
        <AiOutlinePlus color='#2a2a2a' fontSize={'1.2em'}/> 
        <div className='ml-[0.3em] font-light'>Add</div>
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
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ProjContexts } from '../../../contexts/ProjectContexts';
import { IssueContexts } from '../../../contexts/IssueContexts';
import { SprintContexts } from '../../../contexts/SprintContexts';
import BacklogTable from './BacklogTable';
import { AiOutlinePlus } from 'react-icons/ai'
// import Empty from './Empty';
import { useStateContext } from '../../../contexts/ContextProvider';
import { TeamContexts } from '../../../contexts/TeamContexts';




function BacklogContainer( props ) {

   const { id, items } = props;
   const { nav, ProjectNav, ScreenWidth } = useStateContext();
    const { setIssueModal } = IssueContexts();
    const {
      Backlog, 
      // setBacklog,
      // SelectedProj 
    } = ProjContexts();
    const { setSelectedSprint, 
      // SprintIssues 
    } = SprintContexts();


  return (
    <> 
  <BacklogTable id={id} items={items} Backlog={Backlog}/> 

   <div className='flex body-font font-[Open Sans]'>
      <div className='ml-auto mr-auto'
        style={{
          width: !nav && !ProjectNav ? '70vw' : (nav && ProjectNav && ScreenWidth<1024) ? '42.5vw' : '60vw',
          transition: '0.3s'
          }}
      >

      <button className='mt-[0.6em] ml-[0.4em] flex items-center p-1
      hover:bg-[#e2e2e2] rounded-[0.25em] ease-in-out duration-100'
      onClick={
        () => {
          setIssueModal(true)
          setSelectedSprint({})
        }
      }
      >
      <AiOutlinePlus 
      fontSize={'1.4em'}
      color='#505050'
      className='drop-shadow-sm'
      /> 
      <p className='font-normal text-[#505050] ml-1'> Create issue </p>
      </button>
    </div>
    </div>
   </>
  )
}

export default BacklogContainer
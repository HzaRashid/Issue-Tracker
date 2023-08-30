
import React, { useEffect } from 'react'
import axios from 'axios'
import { SprintContexts } from '../../../contexts/SprintContexts'
import { ProjContexts } from '../../../contexts/ProjectContexts';
import Empty from './Empty';
import SprintList from './SprintList';
import { IssueContexts } from '../../../contexts/IssueContexts';
import { AiOutlinePlus } from 'react-icons/ai'
import { useStateContext } from '../../../contexts/ContextProvider';

const data  = require('../../../pages/routes.json')
function SprintsContainer( props ) {

  const { id, items } = props

    const { 
        Sprints, setSprints,
        setNewSprintIssue 
    } = SprintContexts();
    const { SelectedProj } = ProjContexts();
    const { setIssueModal } = IssueContexts();
    const { nav, ProjectNav, ScreenWidth} = useStateContext();

    useEffect( () => { axios.get(data.Sprints)
        .then( 
    
            response => {
                const resData = response.data
                if (!Array.isArray(resData)) {
                    console.log(resData);
                    return;
                }
                setSprints(
                    resData
                    .filter(
                        sprint => 
                        (sprint.project === SelectedProj._id) 
                    )
                  )
            }
            // eslint-disable-next-line
            )}, [SelectedProj])

  return (
    <> 


   { Sprints && Sprints.length ? 

    <SprintList id={id} items={items}/>  : <Empty/> 
    }

   <div className='flex body-font font-[Open Sans] subpixel-antialiased'>
      <div className='ml-auto mr-auto top-0 sticky'
        style={{
          width: !nav && !ProjectNav ? '70vw' : (nav && ProjectNav && ScreenWidth<1024) ? '42.5vw' : '60vw',
          transition: '0.3s'
          }}
      >
 
      <button className='mt-[0.6em] ml-[0.4em] flex items-center p-1 
      hover:bg-[#e2e2e2] rounded-[0.25em] ease-in-out duration-100'
      onClick={
        () => {
          setNewSprintIssue(true);
          setIssueModal(true);
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

export default SprintsContainer
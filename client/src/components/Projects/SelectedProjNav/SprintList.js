import React from 'react'
import { SprintContexts } from '../../../contexts/SprintContexts'
// import { useNavigate } from 'react-router-dom';
import { WhtSpace } from './NavItems';


function SprintList( props ) {
    const { showSprints, SelectedProj, goToPage } = props

    const { 
        Sprints,
        // SelectedSprint, 
        setSelectedSprint 
    } = SprintContexts();

    // const goToPage = useNavigate();

  return (
    <ul 
    className='bg-[#ececec] overflow-auto font-lato
    text-[#404040] font-normal text-[0.935em] shadow-sm rounded-lg'
    

    style={{
        height: 'auto',
        maxHeight: showSprints ? '6em' : '0em',
        transition: 'max-height 0.2s ease-in-out'
    }}

    >
        {
            Sprints?.map(
                (sprint, key) => {
                    let sprintLink = `/projects/${WhtSpace(SelectedProj?.title)}/sprint-board/${WhtSpace(sprint?.title)}`

                    return (
                    <li key={key} 
                    className='hover:bg-[#c8e2f487] rounded-md hover:cursor-pointer'
                    onClick={() => {
                        setSelectedSprint(sprint)
                        goToPage(sprintLink)
                    }}
                    >
                        <div className='ml-[1em] p-1'>
                            {sprint?.title}
                        </div>
                    </li>
                    )
                }
            )
        }
        
    </ul>
  )
}

export default SprintList
import React from 'react'
import { SprintContexts } from '../../../contexts/SprintContexts'
// import { useNavigate } from 'react-router-dom';
import { WhtSpace } from './NavItems';
import { useStateContext } from '../../../contexts/ContextProvider';


function SprintList( props ) {
    const { showSprints, SelectedProj, goToPage } = props

    const { 
        Sprints,
        SelectedSprint, 
        setSelectedSprint 
    } = SprintContexts();
    const { setIsLoading } = useStateContext()
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
                    let sprintLink = `/project-page/${WhtSpace(SelectedProj?.title)}/sprint-board/${WhtSpace(sprint?.title)}/`

                    return (
                    <li key={key} 
                    className='hover:bg-[#c8e2f487] rounded-md hover:cursor-pointer'
                    onClick={() => {
                        if (SelectedSprint?._id !== sprint?._id) {
                            setSelectedSprint(sprint)
                            goToPage(sprintLink)
                            setIsLoading(true);
                        }
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
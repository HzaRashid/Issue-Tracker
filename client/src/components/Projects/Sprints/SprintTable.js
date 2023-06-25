import React, { useEffect } from 'react'
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {  useDroppable } from "@dnd-kit/core";
import { SprintContexts } from '../../../contexts/SprintContexts';
import { ProjContexts } from '../../../contexts/ProjectContexts';
import GetSprintRow from './GetRow';
import axios from 'axios';


const data = require('../../../pages/routes.json')


function SprintTable( props ) {

  const { id, items } = props;
  const { setNodeRef } = useDroppable({ id });

    const { 
      SelectedSprint,
      setSprintIssues 
    } = SprintContexts();

    const { SelectedProj } = ProjContexts();

    // get directly from server
    // to display latest data 
    // after drag and drop feature
    useEffect(
      () => {
        axios.get(data.Issues)
        .then(
          response => {
            if (response.status === 200) {
              setSprintIssues(
                response.data
                .filter(
                  issue => (
                    issue.project === SelectedProj._id && 
                    issue.sprint === SelectedSprint._id &&
                    issue.stage.toLowerCase() !== 'backlog'
                    ))
                  )}
                }) // eslint-disable-next-line
              }, [])

 
  return (

    <SortableContext
    id={id}
    items={items}
    strategy={verticalListSortingStrategy}
     >

      <div 
      className={`
        w-[100%] lg:text-[1.2em] mt-2
        hover:cursor-pointer rounded-lg 
        md:text-[1.15em] sm:text-[1.15em] 
        xs:text-[1em] text-[1em] bg-transparent
        block h-auto max-h-[10em] overflow-auto font-medium`}
        ref={setNodeRef}
      >
        {items.length ? 
        <> 
        { items.map(
          item => (
        <GetSprintRow key={item} id={item}/>
        ))}

        </> : null
        }
      </div>
      </SortableContext>
  )
}

export default SprintTable
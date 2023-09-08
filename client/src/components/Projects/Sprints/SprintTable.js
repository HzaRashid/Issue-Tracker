import React, { useEffect, useState } from 'react'
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {  useDroppable } from "@dnd-kit/core";
import { SprintContexts } from '../../../contexts/SprintContexts';
import GetSprintRow from './GetRow';
import axios from 'axios';
import { IssueContexts } from '../../../contexts/IssueContexts';



function SprintTable( props ) {

  const { id, items } = props;
  const { setNodeRef } = useDroppable({ id });

    const { 
      SelectedSprint,
      setSprintIssues,
    } = SprintContexts();
    const { SearchSptIssues, Issues } = IssueContexts();
    const [ SearchedIssues, setSearchedIssues ] = useState([])
    useEffect(() => {
      setSearchedIssues(
        items.filter(
          // eslint-disable-next-line
          i => 
          {

  // [0]: ID
  // [1]: TYPE
  // [2]: SUMMARY
  // [3]: ASSIGNED USER
  // [4]: STAGE 
  // [5]: ISSUE 
  const assigneeName = i[3].firstName + ' ' + i[3].lastName

              if (SearchSptIssues === '') return i
    
              else if (
              // sprint type
              i[1]?.toLowerCase()?.includes(SearchSptIssues?.toLowerCase()) ||
              // sprint title/summary
              i[2]?.toLowerCase()?.includes(SearchSptIssues?.toLowerCase()) ||
              // assignee
              (
                i[3]?.firstName &&
              assigneeName?.toLowerCase()?.includes(SearchSptIssues?.toLowerCase())
              )

              ) { return i }
          }
      )
      )

    }, [SearchSptIssues, items])
    // console.log(SearchedIssues)

    // const { SelectedProj } = ProjContexts();

    // get directly from server
    // to display latest data 
    // after drag and drop feature
    useEffect(
      () => {
        if (!Issues.length) {
        axios.get(process.env.REACT_APP_API_Issues, { withCredentials: true })
        .then(
          response => {
            if (response.status === 200) {
              setSprintIssues(
                response.data
                .filter(
                  issue => (
                    // issue.project === SelectedProj._id && 
                    issue.sprint === SelectedSprint._id &&
                    issue.stage.toLowerCase() !== 'backlog'
                    ))
                  )}
                }) 
              }
              setSprintIssues(
                Issues
                .filter(
                  issue => (
                    issue.sprint === SelectedSprint._id &&
                    issue.stage.toLowerCase() !== 'backlog'
                    ))
                  )

                // eslint-disable-next-line
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
        {items.length && SearchedIssues?.length  ? 
        <> 
        { SearchedIssues
        .map(
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
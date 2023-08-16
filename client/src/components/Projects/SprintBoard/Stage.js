import React from 'react'
import { useDroppable } from '@dnd-kit/core';
import StageIssue from './StageIssue';
import { verticalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { BsThreeDotsVertical } from 'react-icons/bs'
import { SprintContexts } from '../../../contexts/SprintContexts';


function Stage( props ) {
    const { id, items } = props;
    // console.log(items)
    const { setNodeRef } = useDroppable( { id } );

    const { 
      SelectedSprint,
      editStage, setEditStage, 
      SelectedStage, setSelectedStage,
      setOpenDeleteStage,
      setOpenIssuesLimit
    } = SprintContexts();

    const editStageOptions = [
      {
        title: 'Issues Limit',
        handler: () => setOpenIssuesLimit(true)
      }, 
      {
        title: 'Delete',
        handler: () => setOpenDeleteStage(true)
      }
    ]


  return (
    <>    


     
    <div 
    ref={setNodeRef}
    className='inline-block ml-4 bg-[#e4e4e4] 
    rounded-md text-[#505050] font-lato font-normal shadow-sm
    p-1  w-[16em]  h-max-[6em]'
    > 

    <div className='sticky top-0'> 
    <div className='flex items-center justify-between'> 
    
    <h1 className='text-[0.825em] text-[#505050] ml-[0.5em] mt-1'>
      {id.toUpperCase()}
    </h1>

    <div 
    className={`
    ${id === SelectedStage && editStage ? 'bg-[#395069c7]' : 'hover:bg-[#00000010]'}
    hover:cursor-pointer rounded-sm
    p-1 drop-shadow-sm mr-[0.1em]`}
    onClick={
      (e) => {
        e.stopPropagation();
        if (editStage && SelectedStage && SelectedStage!==id) {
          setSelectedStage(id)
          return
        }
        setEditStage(!editStage)
        setSelectedStage(id)
      }}
      style={{
        transition: 'all 0.1s ease-in-out'
      }}
    >
    <BsThreeDotsVertical color={id === SelectedStage && editStage ? '#e4e4e4' : '#404040'}
    style={{
      transition: 'all 0.1s ease-in-out'
    }}
    />
    </div>

    </div>
    {
    id === SelectedStage && editStage &&
    <div className='shadow-md absolute inline-block rounded-md w-[7em]
    hover:cursor-pointer bg-[#ededed] ml-[8.5em] mt-[0.2em]'
    >
      {
        editStageOptions.map(
          (option, key) => { 
            // must have at least one stage
            if ( option.title.toLowerCase() === 'delete' 
                 && SelectedSprint?.stages?.length === 1 ) {
                  return null
                 }

            return (
            <div 
            key={key} 
            className='hover:bg-[#98c9e521] p-[0.2em]'
            onClick={(e) => {
              e.stopPropagation();
              option.handler()
            }}
            >
            <p className='ml-1 text-[0.95em]'> {option.title}</p>
            </div>
          )}
        )
      }
      </div>
    }
    </div>
    <SortableContext
      id={id}
      items={items}
      strategy={verticalListSortingStrategy}
     >
    <div className='mt-4 hover:cursor-pointer' ref={setNodeRef}>
        {
        items.map(
          (item) => (
          <StageIssue id={item} key={item?._id}/>
          ))
        }
    </div>
    </SortableContext>

    </div>

    
    </>
  )
}

export default Stage
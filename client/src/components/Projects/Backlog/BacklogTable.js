// eslint-disable-next-line
import React, { useEffect, useState } from 'react'
import GetBacklogRow from './GetRow';
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {  useDroppable } from "@dnd-kit/core";
import { useStateContext } from '../../../contexts/ContextProvider';
import Empty from './Empty';



function BacklogTable( props ) {

  const { id, items, Backlog, 
    // loaded 
  } = props;
  const { nav, ProjectNav, ScreenWidth } = useStateContext();
  // console.log(items)
  
  const { setNodeRef } = useDroppable({ id });


  return (
    <>

    {Backlog && Backlog.length ? <> 
    
    <div className='flex body-font font-[Open Sans]'>
      <div className='ml-auto mr-auto mt-[4em] '>
      <p
      className='mb-2 lg:text-[1.55em] md:text-[1.3em] sm:text-[1.3em] 
      text-[1.3em] drop-shadow-sm font-medium'
      >
        Backlog
      </p>
      <SortableContext
      id={id}
      items={items}
      strategy={verticalListSortingStrategy}
      
       >
      <div 
      className={`
        lg:text-[1.2em] 
        md:text-[1.15em] sm:text-[1.15em] 
        xs:text-[1em] text-[1em] bg-transparent 
        hover:cursor-pointer rounded-lg
        block max-h-[40vh] overflow-auto `}
        style={{
          width: !nav && !ProjectNav ? '70vw' : (nav && ProjectNav && ScreenWidth<1024) ? '42.5vw' : '60vw',
          transition: 'width 0.1s'
          }}
      
        ref={setNodeRef}
      >
        {items.length ? 
        <> 
        {
          items.map(
            item => (

            <GetBacklogRow key={item} id={item}/>
    
            )
        
          )
        }
        </> : null
        }


      </div>
      </SortableContext>
      </div>
      </div>
      
      </> :
      <div>
      <Empty/>
      </div>
      }

    </>
  );
}



export default BacklogTable
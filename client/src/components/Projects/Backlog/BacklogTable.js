import React from 'react'
import GetBacklogRow from './GetRow';
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {  useDroppable } from "@dnd-kit/core";
import { useStateContext } from '../../../contexts/ContextProvider';
import Empty from './Empty';



function BacklogTable( props ) {

  const { id, items, Backlog } = props;
  const { nav, ProjectNav, ScreenWidth } = useStateContext();
  const { setNodeRef } = useDroppable({ id });

 return (Backlog && Backlog?.length ?
  <> 
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
      block max-h-[10em] overflow-auto `}
      style={{
        width: !nav && !ProjectNav ? '70vw' : (nav && ProjectNav && ScreenWidth<1024) ? '42.5vw' : '60vw',
        transition: 'width 0.3s'
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

    
    </> : 
    
    <div className='mt-[-2.65em]'> 

    <Empty/> 

    </div>
    

  )
}



export default BacklogTable
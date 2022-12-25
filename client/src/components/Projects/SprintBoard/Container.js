import React, { useEffect, useState } from 'react'
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  MouseSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useParams } from 'react-router-dom';
import { SprintContexts } from '../../../contexts/SprintContexts'
import Stage from './Stage'
import axios from 'axios';
import StageIssue from './StageIssue';
import data from '../../../pages/routes.json';


function Container( { items, setItems } ) {

  const { setSprints } = SprintContexts();
  
  useEffect(
    () => {

        axios.get(
          data.Sprints
        )
        .then(
          res => setSprints(res.data)
          )
        .catch(err => console.log(err))
      // eslint-disable-next-line
    }, [useParams()]
  )

  const [activeId, setActiveId] = useState();

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );


  return (
    <>    

    <div className='flex flex-nowrap font-lato mt-[8em] w-[60vw] overflow-scroll list-none'>
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCorners}
      > 
      <div className='flex flex-nowrap mb-[1.5em]'>
        
      {
        items && 
        Object.keys(items).map(
          (stage, index) => (
          // <div 
          // key={index}
          // className='inline-block ml-4 bg-[#e4e4e4] 
          // rounded-md text-[#505050] font-lato font-normal shadow-sm
          // p-1  w-[16em]  h-max-[6em]'
          // > 
          <Stage id={stage} items={items[stage]} key={stage}/>
          // </div>

          )
        )
      }
      </div> 
      <DragOverlay className='font-normal'>
        {activeId ? <StageIssue id={activeId} shadow={true} /> : null}
      </DragOverlay>
     
    </DndContext>
    </div> 
    
    </>
  )


  function findContainer(id) {
    if (id in items) {
      return id;
    }

    return Object.keys(items).find((key) => items[key].includes(id));
  }

  function handleDragStart(event) {
    document.body.style.setProperty('cursor', 'grabbing');
    console.log(event)

    const { active } = event;
    const { id } = active;

    setActiveId(id);
  }

  function handleDragOver(event) {
    const { active, over, draggingRect } = event;
    const { id } = active;
    if (!over) return; 
    const { id: overId } = over;

    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setItems((prev) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];

      const activeIndex = activeItems.indexOf(id);
      const overIndex = overItems.indexOf(overId);

      let newIndex;
      if (overId in prev) {
        newIndex = overItems.length + 1;
      } else {
        const isBelowLastItem =
          over &&
          overIndex === overItems.length - 1 &&
          draggingRect?.offsetTop > over.rect.offsetTop + over.rect.height;

        const modifier = isBelowLastItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter((item) => item !== active.id)
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          items[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length)
        ]
      };
    });


  }

  function handleDragEnd(event) {
    const { active, over } = event;
    const { id } = active;
    if (!over) return; 
    const { id: overId } = over;
    

    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }


      axios.put(
        data.Issues + '/stage',
        {
          issueID: active.id._id,
          stage: overContainer
        }
      )
      .then(res => console.log(res))
      .catch(err => console.log(err))
  

    const activeIndex = items[activeContainer].indexOf(active.id);
    const overIndex = items[overContainer].indexOf(overId);

    if (activeIndex !== overIndex) {
      setItems((items) => ({
        ...items,
        [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex)
      }));
    }

    document.body.style.setProperty('cursor', 'default');
    setActiveId(null);
  }



}

export default Container



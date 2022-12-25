import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from "@dnd-kit/utilities";
import { MdError } from 'react-icons/md'
import { AiFillTool, AiFillCheckSquare } from 'react-icons/ai'
import { CustomTooltip } from '../../CustomTooltip';

function StageIssue({...props}) {

    const {
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
        } = useSortable({ id: props.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0 : 1,
        };

  return (

    <div 
    className={`
    mt-1 bg-[#eaeaea]
     p-2 rounded-md text-[#303030] border-b-[#cecece] border-b-[0.0025em]
    border-left text-[0.9em]`}
    ref={setNodeRef}
    {...listeners}
    style={style}
    >
        <div className='flex items-center'>
        <div className='ml-1'>
        <CustomTooltip title={props.id?.type}>
                  <div> 
                  {
                    props.id?.type === 'Task' &&
                    <div className=' items-center text-center'>
                    <AiFillCheckSquare 
                    color='#6E94B9' 
                    fontSize={'1.25em'}
                    className='drop-shadow-sm'
                    />
                </div>
                  }
                              {
                props.id?.type === 'Bug' &&
                
                <div className=' items-center text-center'>
                    <MdError 
                    color='#B95E6E' 
                    fontSize={'1.25em'}
                    className='drop-shadow-sm'
                    />
                </div>
                
            }
            {
                props.id?.type === 'Feature' &&
                
                <div className=' items-center text-center'>
                    <AiFillTool 
                    color='#7EA67C' 
                    fontSize={'1.25em'}
                    className='drop-shadow-sm'
                    />
                </div>
                
            }
            </div>
            </CustomTooltip>
        </div>
        <div className='ml-2 text-[#303030]'>
            {props.id?.summary}
        </div>
        </div>
        
    </div>
  ) 
}

export default StageIssue
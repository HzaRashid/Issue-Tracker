import React from 'react'
import { CustomTooltip } from '../../CustomTooltip';
import { MdError } from 'react-icons/md'
import { AiFillTool, AiFillCheckSquare } from 'react-icons/ai'
import { useSortable, } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";


function GetBacklogRow( props ) {
  // type, summary,
  // user


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
      <>
            <div 
              className={`
              bg-[#e6e6e6] text-[#505050] p-1 w-[100%]
               flex items-center 
               hover:bg-[#e0e0e0] hover:shadow-sm
              justify-between   `}
              style={style}
              ref={setNodeRef}   
              {...listeners}
              >
                <div className='flex items-center ml-2'> 
                <CustomTooltip title={props.id[1]}>
                  <div> 
                  {
                    props.id[1] === 'Task' &&
                    <div className=' items-center text-center'>
                    <AiFillCheckSquare 
                    color='#6E94B9' 
                    fontSize={'1.25em'}
                    className='drop-shadow-sm'
                    />
                </div>
                  }
                              {
                props.id[1] === 'Bug' &&
                
                <div className=' items-center text-center'>
                    <MdError 
                    color='#B95E6E' 
                    fontSize={'1.25em'}
                    className='drop-shadow-sm'
                    />
                </div>
                
            }
            {
                props.id[1] === 'Feature' &&
                
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
                  <div className='ml-2 w-[25vw] whitespace-nowrap overflow-auto'> {props.id[2]} </div>
                </div>
                <div className='flex items-center mr-2'>
                {
                  props.id[3] ? 
                  <CustomTooltip 
                  title={`Assigned to ${props.id[3].firstName + ' ' + props.id[3].lastName}`}
                  sx={{fontSize:'0.95em'}}
                  >
                  <div 
                  className='bg-[#dbdbdb] p-1 shadow-sm
                  font-normal rounded-md text-[0.8em]'
                  > 
                  {props.id[3].firstName + ' ' + props.id[3].lastName} 
                  </div> 
                  </CustomTooltip>

                  :
                  <CustomTooltip title={`Unassigned`}>
                  <div
                 className='bg-[#e2d0d0] p-1 shadow-sm
                 font-normal rounded-md text-[0.8em]'
                  >
                    None
                  </div>
                  </CustomTooltip>
                }

              </div>
                  
              </div>
      
      </>
    )
}

export default GetBacklogRow
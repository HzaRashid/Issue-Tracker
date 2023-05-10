import React from 'react'
import { IssueContexts } from '../../../contexts/IssueContexts';


function Empty() {
  // eslint-disable-next-line
    const { Backlog, setBacklog } = IssueContexts();
   
  return (
    <> 
    <div className='flex body-font font-lato'>
    <div className='ml-auto mr-auto mt-[4em] '>
    <p
    className='mb-2 lg:text-[1.55em] md:text-[1.3em] sm:text-[1.3em] 
    text-[1.3em] drop-shadow-sm'
    >
      Backlog
    </p>
    <div className='w-[60vw] h-[10em] 
     rounded-md border-dashed 
    border-[#d4d4d4] border-[0.1em]'
    >
        <div className='text-center translate-y-[300%]'> 
            <p className='text-[#6a6a6a] 
            font-lato font-normal text-[0.9em]'>
                 Empty 
            </p>
        </div>
    </div>
    </div>
    </div>
    </>
  )
}

export default Empty
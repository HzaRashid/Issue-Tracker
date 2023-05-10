import React, { useState } from 'react'
import { AiFillProject, AiOutlineUnorderedList } from 'react-icons/ai'
import { CustomTooltip } from '../../CustomTooltip'
import { Switch } from '@headlessui/react'
import SwapProjNavVertical from './SwapProjNavVertical'

function SwapProjNav( props ) {
  const [enabled, setEnabled] = useState(false)
  const { ProjectNav } = props
  return (
    <>
    <div className='mt-auto'> 
    <div className='flex justify-center items-center'> 
    <div className='flex justify-center items-center'> 

    <li className='mt-auto ml-[2.5em] fixed'
    style={{
      visibility: ProjectNav ? 'visible' : 'hidden',
      opacity: ProjectNav ? '1' : '0',
      transition: ProjectNav ? '0.4s' : '0.1s'
    }}
    >
    <div className='flex justify-center items-center'> 
      <Switch
      // checked={enabled}
      // onChange={setEnabled}
      className={` bg-gray-200 relative inline-flex h-10 w-28 items-center rounded-md `}

    >

      <span
        className={`${
          enabled ? 'translate-x-[3.5em]' : 'translate-x-0' 
        } shadow inline-block h-10 w-14 transform rounded-md  
        bg-[#ffcaf154] ]  transition`}
      >
        <span className={`${
          enabled ? 'translate-x-[0.055em]' : 'translate-x-0' 
        } w-[0.2em] h-[0.2em] mt-[3em] bg-[#505050] rounded-full opacity-[100] inline-block`}></span>
      </span>

      <div className=' text-center  fixed  inline-block'> 
      <div className='flex justify-between w-[7em]'>

      <CustomTooltip title={'Current Project'} > 
      <span className='h-10 w-14' onClick={() => setEnabled(false)}>
      <div className='flex justify-center mt-[0.325em]'> 
      <AiFillProject fontSize={'1.75em'} 
      color={`${enabled ? '#00000054' : '#505050'}`} 
      className=' drop-shadow-sm transition-all'
      />
      </div>
      </span>
      </CustomTooltip> 

      <CustomTooltip title={'Other Projects'}  > 
      <span className=' h-10 w-14 bg-blue' onClick={() => setEnabled(true)}>
      <div className='flex justify-center mt-[0.325em]'> 
      <AiOutlineUnorderedList fontSize={'1.75em'}
      color={`${enabled ? '#505050' : '#00000054'}`} 
      className=' drop-shadow-sm  transition-all'
      />
      </div>
      </span>
      </CustomTooltip>


    </div>
    </div>
    </Switch>
    </div> 
  </li>
  </div>
  <li className=''
  style={{
    visibility: ProjectNav ? 'hidden' : 'visible',
    opacity: ProjectNav ? '0' : '1',
    transition: ProjectNav ? '0.1s' : '0.4s'
  }}
  >
    <SwapProjNavVertical enabled={enabled} setEnabled={setEnabled} />
  </li>
  </div>

  </div>
    </>
  )
}

export default SwapProjNav
import React from 'react'
import { useState } from 'react'
import { Switch } from '@headlessui/react'
import { AiFillProject, AiOutlineUnorderedList } from 'react-icons/ai'
import { CustomTooltip } from '../../CustomTooltip'

function SwapProjNavVertical( props ) {
    const { enabled, setEnabled, setProjectNav } = props;
    // console.log(enabled)
  return (
    <Switch
    // checked={enabled}
    // onChange={setEnabled}
    className={`bg-gray-200  flex h-[4em] w-8 items-center rounded-md`}
  >

    <span
      className={`${
        enabled ? 'translate-y-[-1em]' : 'translate-y-[1em]'
      } inline-block h-8 w-8 shadow z-100 absolute
      transform rounded-md bg-[#ffcaf154] transition `}
    />
    <div className=' w-8 h-[4em]'> 

    <div> 
    <CustomTooltip title={'Other Projects'} placement='right'>
    <span className='flex justify-center h-[2em] w-8' onClick={() => {setEnabled(true); setProjectNav(true)}}>
      <div className='mt-1'>
      <AiOutlineUnorderedList fontSize={'1.5em'}
      color={`${enabled ? '#505050' : '#00000054'}`} 
      className=' drop-shadow-sm  transition-all'
      />
      </div>
    </span>
    </CustomTooltip>

    <CustomTooltip title={'Current Project'} placement='right' > 
    <span className='flex justify-center h-[2em] w-8' onClick={() => setEnabled(false)}>
      <div className='mt-1'>
      <AiFillProject fontSize={'1.5em'} 
      color={`${enabled ? '#00000054' : '#505050'}`} 
      className=' drop-shadow-sm transition-all'
      />
      </div>
    </span>
    </CustomTooltip>

  </div>
  </div>
  </Switch>
  )
}

export default SwapProjNavVertical
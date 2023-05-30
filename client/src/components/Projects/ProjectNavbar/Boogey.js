import React from 'react'
import { useState } from 'react'
import { Switch } from '@headlessui/react'
import { useStateContext } from '../../../contexts/ContextProvider'
import { CustomTooltip } from '../../CustomTooltip'
import { AiFillProject, AiOutlineUnorderedList } from 'react-icons/ai'
import SwapProjNavVertical from './SwapProjNavVertical'




function Boogey() {
  const [enabled, setEnabled] = useState(false)
  const { SwapProjNav, setSwapProjNav } = useStateContext()
  const { nav,setNav, ProjectNav, setProjectNav  } = useStateContext();
  return (
    <> 
    <div className='flex justify-center items-center'
    style={{
      marginTop: SwapProjNav ? '7em' : '-2.85em',
      }}
    > 
    <Switch
      // checked={enabled}
      // onChange={setEnabled}
      className={` bg-gray-200 relative inline-flex h-10 w-28 items-center rounded-md `}

    >

      <span
        className={`${
          SwapProjNav ? 'translate-x-[3.5em]' : 'translate-x-0' 
        } shadow inline-block h-10 w-14 transform rounded-md  
        bg-[#ffcaf154] ]  transition`}
      >
        <span className={`${
          SwapProjNav ? 'translate-x-[0.055em]' : 'translate-x-0' 
        } w-[0.2em] h-[0.2em] mt-[3em] bg-[#505050] rounded-full opacity-[100] inline-block`}></span>
      </span>

      <div className=' text-center  fixed  inline-block'> 
      <div className='flex justify-between w-[7em]'>

      <CustomTooltip title={'Current Project'} > 
      <span className='h-10 w-14' onClick={() => setSwapProjNav(false)}>
      <div className='flex justify-center mt-[0.325em]'> 
      <AiFillProject fontSize={'1.75em'} 
      color={`${SwapProjNav ? '#00000054' : '#505050'}`} 
      className=' drop-shadow-sm transition-all'
      />
      </div>
      </span>
      </CustomTooltip> 

      <CustomTooltip title={'Other Projects'}  > 
      <span className=' h-10 w-14 bg-blue' onClick={() => setSwapProjNav(true)}>
      <div className='flex justify-center mt-[0.325em]'> 
      <AiOutlineUnorderedList fontSize={'1.75em'}
      color={`${SwapProjNav ? '#505050' : '#00000054'}`} 
      className=' drop-shadow-sm  transition-all'
      />
      </div>
      </span>
      </CustomTooltip>


    </div>
    </div>
    </Switch>
    </div>
    
    </>
  )

}

export default Boogey
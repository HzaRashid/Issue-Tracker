import React from 'react'
import { useStateContext } from '../contexts/ContextProvider'


function CustomModal({ ...props }) {
   const { ScreenWidth } = useStateContext();
   const isMobile = ScreenWidth < 768;
  return (
    <div className={
        `${props.open ? 
        'visible' : 'invisible'
        }
        ease-in-out duration-[0.09s] fixed z-50
        w-[100%] h-[100%] bg-[#0000002a] 
        flex items-center justify-center`}
        style={{
          WebkitTransformStyle: 'preserve-3d',
          WebkitBackfaceVisibility: 'hidden'
        }}
        >
        <div className={`${
          props.open ? 
        'translate-y-[0vh]' : 'translate-y-[100vh]'
        }
        ${ isMobile ? 'w-[95vw]' :  'lg:w-[45vw] md:w-[60vw]' }
        
        ease-in-out duration-[0.2s] body-font font-lato
        fixed h-[auto] p-4 pb-5
        bg-[#f0f0f0] rounded-3xl subpixel-antialiased
        shadow-lg text-[1.2em] overflow-auto`}
        style={{
          WebkitTransformStyle: 'preserve-3d',
          WebkitBackfaceVisibility: 'hidden',
        }}
        > 
        { props.children }
        </div>
        </div>
  )
}

export default CustomModal
import React from 'react'
import { useStateContext } from '../contexts/ContextProvider'


function CustomModalSmall({ ...props }) {
   const { ScreenWidth } = useStateContext();
   const isMobile = ScreenWidth < 768;
  return (
    <div className={
        `
        ease-in-out duration-[0.09s] fixed z-50
        w-[100%] h-[100%] bg-[#0000002a] 
        flex items-center justify-center`}
        style={{
          WebkitTransformStyle: 'preserve-3d',
          WebkitBackfaceVisibility: 'hidden',
          visibility:  props.open ? 'visible' : 'hidden',
          opacity:  props.open ? '1' : '0',
          transition: 'all 0.25s'
        }}
        >
        <div className={`
        ${ isMobile ? 'w-[90vw]' :  'w-[40vw]' }
        
        ease-in-out duration-[0.2s] body-font font-lato
        fixed h-[auto] p-4 pb-5
        bg-[#f0f0f0] rounded-3xl subpixel-antialiased
        shadow-lg text-[1.2em] overflow-auto`}
        style={{
          WebkitTransformStyle: 'preserve-3d',
          WebkitBackfaceVisibility: 'hidden',
          visibility:  props.open ? 'visible' : 'hidden',
          opacity:  props.open ? '1' : '0',
          transition: 'all 0.25s'
        }}
        > 
        { props.children }
        </div>
        </div>
  )
}

export default CustomModalSmall
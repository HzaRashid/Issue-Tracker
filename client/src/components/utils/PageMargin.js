import React from 'react'
import { useStateContext } from '../../contexts/ContextProvider';

function PageMargin( {...props} ) {
    const { nav, ProjectNav } = useStateContext();
    const bothNavsClosed = !ProjectNav && !nav
    const ProjNavOpen  = ProjectNav && !nav
    const NavOpen = !ProjectNav && nav
  return (
    <div className={`
    ${
      bothNavsClosed ? 'left-[8.75em]' :
      ProjNavOpen ? 'left-[17.75em]' : 
      NavOpen ? 'left-[16em]' : 'left-[27em]'
    }
  mt-[1rem] flex absolute font-lato
  text-[1rem] whitespace-pre rounded-md`} 
  style={{
    transition: 'all 0.2s ease-in-out'
  }}
  >
    { props.children }
  </div>
  )
}

export default PageMargin
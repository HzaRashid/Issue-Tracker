import React from 'react'
import { useStateContext } from '../../contexts/ContextProvider';

function PageMargin2( {...props} ) {
    const { nav, ProjectNav } = useStateContext();

  return (
    <div 
    className={`
    ${
      nav ? 'ml-[14rem]' : 'ml-[6.25rem]'
  } 
  body-font font-lato ease-in-out duration-[.3s]`
  }
    >

<div className={`
        ${
          ProjectNav ? 
          'ml-[10rem]' : 'ml-[2rem]'
        }
        ease-in-out duration-[0.2s] `
          }
        >
            { props.children }
</div>
</div>
  )
}

export default PageMargin2
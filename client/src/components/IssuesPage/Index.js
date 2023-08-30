import React, { useEffect } from 'react'
import AssigneeList from './AssigneeList'
import PostedList from './PostedList'
import { motion } from 'framer-motion'

function Index() {

  return (
    <>

    <div className='overflow-hidden z-0'>

    <AssigneeList/>

    </div> 
    <div className='overflow-hidden z-0'>

    <PostedList/>

    </div> 

     </>
  )
}

// const Transition = ( { ...props } ) => {
//   return (
//     <div
//     // initial={{ opacity: 0,  }}
//     // animate={{ opacity: 1,  }}
//     // transition={{ duration: 0.45 }}
//     // exit={{ opacity: 0 }}
//     >
//       { props.children }
//     </div>
//   )

// }

export default Index
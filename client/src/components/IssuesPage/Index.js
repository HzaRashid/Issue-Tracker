import React from 'react'
import AssigneeList from './AssigneeList'
import PostedList from './PostedList'

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



export default Index
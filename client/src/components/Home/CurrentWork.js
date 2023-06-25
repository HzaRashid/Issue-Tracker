import React, { useEffect } from 'react'
import List from './Issues/List'
import { SprintContexts } from '../../contexts/SprintContexts'
import axios from 'axios'
// import Example from './Chart/IssueTypeData'
import Example2 from './Chart/IssueTypeData2'

const data = require('../../pages/routes.json')
function CurrentWork() {
  const { setSprints } = SprintContexts();
  useEffect(() => {
    axios.get(
      data.Sprints
    )
    .then(res => setSprints(res.data))
    .catch(err => console.log(err))
    // eslint-disable-next-line
    }, [])





  return (
    <div> 
    <div className=' w-[100%] '>
      <List/>
      <div className='mt-4 '>
        <div className='antialiased'> 

        {/* <Example/> */}
        <Example2/>
        </div>
      </div>

    </div>
    </div>
  )
}

export default CurrentWork
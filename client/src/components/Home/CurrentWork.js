import React, { useEffect } from 'react'
import List from './Issues/List'
import { SprintContexts } from '../../contexts/SprintContexts'
import axios from 'axios'
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
    <div className='flex w-[100%] '>
      <List/>
      <div>

      </div>
    </div>
  )
}

export default CurrentWork
import { MdError } from 'react-icons/md'
import { AiFillCheckSquare } from 'react-icons/ai'
import { AiFillTool } from 'react-icons/ai'

export const Types = [
    { 
      title: 'Task',
      icon:  <AiFillCheckSquare
            className='mr-auto ml-auto' 
            color='#5E8EBD' 
            fontSize={'1.25em'}
            />
    },
    { 
      title: 'Bug',
      icon: <MdError 
            className='mr-auto ml-auto' 
            color='#B75858' 
            fontSize={'1.25em'}
            />
    },
    { 
      title: 'Feature',
      icon: <AiFillTool 
            className='mr-auto ml-auto' 
            color='#65A766' 
            fontSize={'1.25em'}
            />
    },
]
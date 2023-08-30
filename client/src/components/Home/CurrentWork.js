import React, { useEffect, useState } from 'react'
import List from './Issues/List'

import { IssueContexts } from '../../contexts/IssueContexts'
// import { ProjContexts } from '../../contexts/ProjectContexts'
import Header from './Projects/Header'
import { useStateContext } from '../../contexts/ContextProvider'
// import { IssueTypeData } from './Chart/IssueTypeData'
import { IssueUpdateData } from './Chart/IssueUpdateData'
import { motion } from 'framer-motion'
// import axios from 'axios'
const data = require('../../pages/routes.json')

function CurrentWork( ) {

  const { IssueVersions } = IssueContexts();
//   const [ HomeIssues, setHomeIssues ] = useState([]);
//   useEffect(() => {
//     axios.get(
//         data.Issues
//     )
//     .then(res => { setIssues(res.data); setHomeIssues(res.data) })
//     .catch(err => console.log(err))
// // eslint-disable-next-line
// }, []);

  const { ScreenWidth, nav, ProjectNav } = useStateContext();

  // var isMobile = () => ScreenWidth < 768 
  const [ isMobile, setIsMobile ] = useState(false);

  useEffect(() => {
        if (nav && ProjectNav)  setIsMobile(ScreenWidth < 1312)
        else if (nav) setIsMobile(ScreenWidth < 981)
        else if (ProjectNav) setIsMobile(ScreenWidth < 1100)
        else setIsMobile(ScreenWidth < 768)
        return () => {}
    // eslint-disable-next-line
  }, [ScreenWidth])

  return (
    <div className=''> 

    <div className='overflow-hidden z-0'>
      <Transition> 
      <List />
      </Transition>
    </div> 

    <div className='items-center mt-[2em]'
        style={{
          position: isMobile ? 'block' : 'flex',
          display: isMobile ? 'block' : 'flex',
          justifyContent: isMobile ? 'center' : 'start',
        }}
    > 
    <div className='flex justify-center'
            style={{
              width: isMobile ? '100vw' : '50vw',
              marginLeft: isMobile ? '2.5em' : '3em',
              // marginRight: isMobile ? '4em' : ''
            }}
    > 
    <Transition> 
    <IssueUpdateData IssueVersions={IssueVersions} isMobile={isMobile}/>
    </Transition> 
    </div>
    <div className='flex w-[50vw] items-center 
    justify-center overflow-scroll'
    style={{

      marginTop:  isMobile? '2em' : '',
      marginLeft:  isMobile? '2em' : '',
      justifyContent:  isMobile ? 'center' : '',
      width: isMobile ? '95vw' : '50vw',
      
    }}
    > 
    {/* <Transition>  */}
    <Header isMobile={isMobile}/>
    {/* </Transition> */}
    </div>

       
    </div> 
        

    </div>
  )
}

const Transition = ( { ...props } ) => {
  return (
    <motion.div
    initial={{ opacity: 0,  }}
    animate={{ opacity: 1,  }}
    transition={{ duration: 0.4 }}
    exit={{ opacity: 0 }}
    >
      { props.children }
    </motion.div>
  )

}

export default CurrentWork
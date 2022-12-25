import React, { useEffect, useState, useRef } from 'react'
import { AiFillCheckSquare, AiFillTool, AiOutlineClose } from 'react-icons/ai'
import { IssueContexts } from '../../../contexts/IssueContexts';
import { CustomTooltip } from '../../CustomTooltip';
import axios from 'axios';
import { MdError } from 'react-icons/md';
import { BiChevronDown } from 'react-icons/bi';
import { TeamContexts } from '../../../contexts/TeamContexts';
import { Types } from '../Create/Types'
import { SprintContexts } from '../../../contexts/SprintContexts';
const data = require('../../../pages/routes.json')

function FormWrapper( {...props} ) {

  const { SelectedSprint, items, setItems } = SprintContexts()
  const { 
    setEditIssueModal,
    SelectedIssue, setSelectedIssue
    } = IssueContexts();

    const { Users } = TeamContexts();
     
    const [summary, setSummary] = useState('');
    // const [Assignee, setAssignee] = useState(null);
    const [showTypes, setShowTypes] = useState(false);
    const [showUsers, setShowUsers] = useState(false);
    const [showStages, setShowStages] = useState(false);
    const [Search, setSearch] = useState('');

    const userListRef = useRef(null)
    const stageListRef = useRef(null)

    useEffect(() => {
      function handleOutsideClick(e) {
        if (
          userListRef.current && 
          !userListRef.current.contains(e.target)
          ) {
            setShowUsers(false)
        }
      }
      document.addEventListener('mousedown', handleOutsideClick)
      document.addEventListener('pointerdown', handleOutsideClick)
      document.addEventListener('touchstart', handleOutsideClick)
      
      return () => {
        document.removeEventListener('mousedown', handleOutsideClick)
        document.removeEventListener('pointerdown', handleOutsideClick)
        document.removeEventListener('touchstart', handleOutsideClick)
      }

    }, [userListRef])
     
     useEffect(
      () => {
        if (Users && SelectedIssue?.assignedTo) {
          const user = Users?.filter(user => 
            user._id === SelectedIssue.assignedTo
          )[0];
          setSearch(user?.firstName + ' ' + user?.lastName) 
        }
      }, [Users, SelectedIssue]
     )

     useEffect(
      () => {
        if (SelectedIssue?.summary) {
          setSummary(SelectedIssue?.summary)
        }
      }, [SelectedIssue]
     )

    const handleSuccessClose = () => {
        setEditIssueModal(false);
        setTimeout(() => setSelectedIssue(null), 250);
      }


        const handleSummarySubmit = () => {
          if (
            summary !== SelectedIssue.summary 
            && summary.replace(/\s/g, '').length > 0
            ) {
              setSelectedIssue({
                ...SelectedIssue,
                summary: summary
              })
            axios.put(
              data.Issues + '/summary',
              {
                issueID: SelectedIssue?._id,
                summary: summary
              }
            )
            .then(res => console.log(res))
            .catch(err => console.log(err))
          } else {
            setSummary(SelectedIssue.summary)
          }
        }

      const handleAssigneeSubmit = (assignee) => {

        console.log(assignee)

          const userExists = Users.filter(user => 
            user._id === assignee?._id)?.length
          if (!userExists) {
            const user = Users?.filter(user => 
              user._id === SelectedIssue.assignedTo
            )[0];

            setSearch(user?.firstName + ' ' + user?.lastName) 
            return;
          };


          setSelectedIssue({
            ...SelectedIssue, 
            assignedTo: assignee._id
          })
          axios.put(
            data.Issues + '/assignee',
            {
              issueID: SelectedIssue?._id,
              assignedTo: assignee?._id
            }
          )
          .then(res => console.log(res))
          .catch(err => console.log(err))
        }
  

  const [Page, setPage] = useState(0);
  const activePageClass = 'bg-[#00000008] text-[#446a67] font-normal shadow-sm'
      
  return (
    <> 
    <div className='flex items-center justify-center mt-1 space-x-4'>
    <div className=''>
    <CustomTooltip 
    title={'Change issue type'} 
    arrow 
    sx={{fontSize: '0.9em'}}
    placement='top'
    >
    <div className='flex items-center bg-[#f0f0f0] rounded-md
    shadow cursor-pointer p-[0.025em] hover:bg-[#00000008] ' 
      onClick={() => setShowTypes(!showTypes)}
    >  
    <div className='mr-1'>
      <BiChevronDown
      className={`${showTypes ? 'rotate-180' : 'rotate-0'} ease-in-out duration-100`}
      />
    </div>
    {
      SelectedIssue?.type === 'Task' &&
      <div className=' items-center text-center mr-1'>
      <AiFillCheckSquare
      color='#5E8EBD' 
      fontSize={'1.3em'}

      />
  </div>
    }
    {
    SelectedIssue?.type === 'Bug' &&
  
    <div className=' items-center text-center mr-1' >
        <MdError 
        color='#B75858' 
        fontSize={'1.3em'}

        />
    </div>
    
  }
  {
      SelectedIssue?.type === 'Feature' &&
      
      <div className=' items-center text-center mr-1'>
          <AiFillTool
          color='#65A766' 
          fontSize={'1.3em'}
          className='drop-shadow-sm'

          />
      </div>
      
  }
  </div>
  </CustomTooltip>
  { showTypes &&
        <ul className='bg-[#e6e6e6] text-[#505050] h-auto max-h-[6em]
         text-[0.825em] mt-2
        w-[7em] rounded-md shadow-md absolute overflow-auto'
        >
        {
        Types.map(
          (type, index) => (
          <li 
          key={index} 
          className='rounded-md  w-[7em] p-1 
          hover:cursor-pointer hover:bg-[#00000008]'
          onClick={() => {
            setSelectedIssue({
              ...SelectedIssue,
              type: type.title
            })
            setShowTypes(false);

            axios.put(
              data.Issues + '/type',
              {
                _id: SelectedIssue._id,
                type: type.title
              }
            )
            .then(res => console.log(res))
            .catch(err => console.log(err))
          }}
          >
            
            <div className='flex items-center'> 
            <div> {type.icon} </div>
            <div className='ml-2'> {type.title} </div>
            </div>

          </li>
          )
        )
        }

        </ul>
      }
      </div>


  <div className='flex items-center'> 
  <CustomTooltip 
  title={'Change issue summary'}
  arrow 
  sx={{fontSize: '0.9em'}}
  placement='top'
  > 
  <input 
  type='text' 
  placeholder={summary?.length ? summary : 'Summary..'}
  className=' 
  focus:border-b-[#4188b4]
  focus:border-b-[0.05em] 
  antialiased w-[15em]
  border-b-[0.05em] truncate 
  border-b-[#a8a8a8] whitespace-pre-line
   outline-none font-normal text-[0.9em]
  placeholder:text-[#404040] bg-transparent'
  value={summary}
  onChange={(e) => setSummary(e.target.value)}
  onBlur={handleSummarySubmit}
  onKeyDown={(e) => {
   if (e.key === 'Enter') {
    handleSummarySubmit()
   }
  }}
  >
  
  </input>
  </CustomTooltip>
  </div>
  </div>

  <div className='flex items-center justify-center mt-4 space-x-4'> 

  <div ref={userListRef}>
  <CustomTooltip 
  title={'Change assignee'}
  arrow 
  sx={{fontSize: '0.9em'}}
  placement='left'
  > 
  <input 
  type='text' 
  placeholder={'Select assignee'}
  value={Search}
  className='inline-block bg-[#00000009] max-w-[8em]
  rounded-lg outline-none font-normal 
  p-1 text-[#5a5a5a] placeholder:text-[#606060]
   text-[0.8em] shadow-sm'
  onChange={(e) => setSearch(e.target.value)}
  onFocus={() => {
    setShowUsers(true)
  }}
  >
  </input>

  </CustomTooltip>


    <ul className='bg-[#eaeaea] h-auto max-h-[6em] 
    text-[0.8em] overflow-y-auto w-[8em] mt-1
    rounded-md text-[#6a6a6a] shadow-md absolute' 
    style={{
      visibility: showUsers ? 'visible' : 'hidden',
      opacity: showUsers ? '100' : '0',
      transition: 'all 0.1s ease-in-out'
    }}
    >
  
      {
      Users
      .filter(// eslint-disable-next-line
        user => {
          const Name = user.firstName + ' ' + user.lastName;
          if (Search==='') 
            return user
          
          else if(
            Name?.toLowerCase().includes(
            Search.toLowerCase()
            )
          ) {
            return user
          }
        }
      )
      .map(
        (user, key) =>
        <li key={key}
        className='hover:cursor-pointer
        hover:bg-slate-200 rounded-md p-1'
        onClick={() => {
          setSearch(user?.firstName + ' ' + user?.lastName);
          handleAssigneeSubmit(user)
          
        }}
        >
          <div>
            {user.firstName + ' ' + user.lastName}
          </div>
        </li>
        )

      }
    </ul>
  
  </div>



  <div ref={stageListRef}>
  <CustomTooltip
  title={'Change stage'}
  arrow 
  sx={{fontSize: '0.9em'}}
  placement='right'
  > 
  <div className='flex items-center shadow-sm
  whitespace-nowrap text-[0.8em] p-1 pr-2 rounded-md 
  bg-[#001b470a] text-[#606060] w-auto
  max-w-[8.5em] overflow-auto cursor-pointer'
    onClick={() => setShowStages(!showStages)}
    > 
  <div className='mr-1'> 
  <BiChevronDown className={`${showStages ? 
    'rotate-180' : 'rotate-0'} ease-in-out duration-100`}
  />
  </div>
  <div>
    {SelectedIssue?.stage?.toUpperCase()}
  </div>
  </div> 
  </CustomTooltip>

    <ul className='absolute text-[0.8em] 
    mt-1.5 w-[7.5em] bg-[#e4e6e9] cursor-pointer
    text-[#606060] rounded-md shadow-md
    space-y-1 py-1'
    style={{
      visibility: showStages ? 'visible' : 'hidden',
      opacity: showStages ? '100' : '0',
      transition: 'all 0.1s ease-in-out'
    }}
    >
      {SelectedSprint?.stages?.map(
        (stage, key) => (

          <li
          key={key}
          className='hover:bg-[#00000008] 
          p-[0.1em] rounded-md'
          onClick={() => {
            setSelectedIssue({
              ...SelectedIssue, 
              stage: stage?.title
            })
            setShowStages(false);

            const prevStage = Object.keys(items)?.filter(key => 
              key?.toLowerCase() === SelectedIssue?.stage?.toLowerCase()
              )[0]

            const newStage = stage?.title;
            // make a copy to avoid mutating state
            let prevStageIssues = items[prevStage].slice();
            prevStageIssues = prevStageIssues.filter(
              issue => issue._id !== SelectedIssue._id
            )
            console.log(prevStageIssues)

            let newStageIssues = items[newStage].slice()
            const isDuplicated = newStageIssues.filter(issue => 
              issue._id === SelectedIssue?._id
            )?.length

            if (!isDuplicated) {
              newStageIssues.push({...SelectedIssue, stage: newStage})
            }

            console.log('OLD:')
            console.log(prevStageIssues)
            console.log('NEW:')
            console.log(newStageIssues)
            // console.log(newStageIssues)

            setItems(oldState => {
              return ({
              ...oldState,
              [newStage]: newStageIssues,
              [prevStage]: prevStageIssues

            })})
            
            axios.put(
              data.Issues + '/stage',
              {
                issueID: SelectedIssue._id,
                sprintID: SelectedSprint._id,
                stage: stage?.title
              }
            )
            .then(res => console.log(res))
            .catch(err => console.log(err))
          
          }}
          
          >
            <p className='ml-1'> {stage?.title?.toUpperCase()} </p>
          </li>
          
        )
      )}
    </ul>

  </div>

  </div>





  <div> 

    <div className='flex items-center 
    justify-center mt-8 space-x-2 font-light 
    text-[0.925em] text-[#404040]'>
      <div
      className={`
      ${Page === 0 ? activePageClass : 
        'hover:bg-[#4f745f0a]'}
        cursor-pointer p-1 rounded-md 
        transition ease-in-out delay-50 
        hover:scale-105 duration-100`
      }
      onClick={() => setPage(0)}
      >
        <p>History</p>
      </div>
      <div className='text-[#858585]'> | </div>
      <div
      className={`
      ${Page === 1 ? activePageClass : 
      'hover:bg-[#4f745f0a]'}
      cursor-pointer p-1 rounded-md 
      transition ease-in-out delay-50 
      hover:scale-105 duration-100`
      }
      onClick={() => setPage(1)}
      >
        <p>
          Comments
        </p>
      </div>
    </div>


    <div className='h-[20vh]'> 
      {props.children}
    </div>
    
  </div>
    <div className='flex items-center-center mt-[1em] justify-between'> 
    <CustomTooltip title='Cancel' placement='top'>
    <button 
    className='float-left hover:bg-[#e2e2e2] 
    ml-[0.25em] ease-in-out duration-100'
    onClick={handleSuccessClose}
    >
    <AiOutlineClose fontSize={'1.5em'} color='#202020'/>
    </button>
    </CustomTooltip>
    </div>
    </>
  )
}

export default FormWrapper
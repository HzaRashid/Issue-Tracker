import React, { useEffect, useState, useRef } from 'react'
import { AiFillCheckSquare, 
  // AiFillDelete, 
  AiFillTool, AiOutlineClose } from 'react-icons/ai'
import { IssueContexts } from '../../../contexts/IssueContexts';
import { CustomTooltip } from '../../CustomTooltip';
import axios from 'axios';
import { MdError } from 'react-icons/md';
import { BiChevronDown } from 'react-icons/bi';
import { TeamContexts } from '../../../contexts/TeamContexts';
import { Types } from '../Create/Types'
import { SprintContexts } from '../../../contexts/SprintContexts';
import { useLocation } from 'react-router-dom';
import { AuthContexts } from '../../../App/Auth';
import { ProjContexts } from '../../../contexts/ProjectContexts';
// import Delete from '../Delete/Delete';


function FormWrapper( props ) {
  const currLoc = useLocation();
  const { 
    Sprints, 
    setSprints,
    SelectedSprint, 
    setSelectedSprint, 
    items, setItems,
    // SprintIssues,
    // setSprintIssues
  } = SprintContexts();
  // console.log(SelectedSprint)
  const { Backlog, setBacklog } = ProjContexts()
  const { 
    setEditIssueModal,
    SelectedIssue, 
    setSelectedIssue, 
    setIssueModified 
  } = IssueContexts();

    const { Users } = TeamContexts();
    const { user } = AuthContexts();  // get _id of logged-in user
    // console.log(user?.user) 
    const [summary, setSummary] = useState('');
    // const [Assignee, setAssignee] = useState(null);
    const [showTypes, setShowTypes] = useState(false);
    const [showUsers, setShowUsers] = useState(false);
    const [showStages, setShowStages] = useState(false);
    const [Search, setSearch] = useState('');  // search users

    const [sprintSearch, setSprintSearch] = useState('');  // search sprints
    const handleSprintSearch = e => setSprintSearch(e.target.value)

    const userListRef = useRef(null);
    const stageListRef = useRef(null);

    useEffect(() => {
      if (!Sprints?.length && props.EditIssueModal === true) {
        axios.get(process.env.REACT_APP_API_Sprints, { withCredentials: true })
        .then(res => setSprints(res?.data))
      }
      // eslint-disable-next-line
    }, []);

    useEffect(() => {

      if (SelectedIssue?.sprint) {
        setSelectedSprint(
          Sprints?.filter(s => s._id === SelectedIssue?.sprint)[0]
        )
      }
      // eslint-disable-next-line
    }, [SelectedIssue]);

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
        if (!SelectedIssue?.assignedTo) setSearch('Unassigned')
        if (Users && SelectedIssue?.assignedTo?.length) {
          // console.log(SelectedIssue?.assignedTo)
          const user = Users?.filter(user => 
            user._id === SelectedIssue.assignedTo
          )[0];
          // console.log(user)
          setSearch(user?.firstName + ' ' + user?.lastName) 
        }
      }, [Users, SelectedIssue]
     )
     useEffect(
      () => {
          setSprintSearch(Sprints?.filter(
            s => s._id === SelectedIssue?.sprint)[0]?.title || 'Backlog') 
      }, [SelectedIssue, Sprints]
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
                summary: summary,
              })
            axios.put(
              process.env.REACT_APP_API_Issues + '/summary',
              {
                issueID: SelectedIssue?._id,
                summary: summary,
                modifiedBy: user?.user // logged-in user's _id
                
              },
              { withCredentials: true }
            )
            .then(res => {
              console.log(res.status)
            })
            .catch(err => {
              console.log(err)
            })
          } else {
            setSummary(SelectedIssue.summary)
          }
        }

      const handleAssigneeSubmit = (assignee) => {

        // console.log(assignee)

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
            process.env.REACT_APP_API_Issues + '/assignee',
            {
              issueID: SelectedIssue?._id,
              assignedTo: assignee?._id,
              modifiedBy: user?.user
            },
            { withCredentials: true }
          )
          .then(res =>{
            //  console.log(res)
            })
          .catch(err => console.log(err))
        }


  const handleSprintSubmit = (sprintID, issue) => {
    const origIssue = {...issue};
    axios.put(
      process.env.REACT_APP_API_Issues + '/sprint',
      {
        issueID: issue?._id,
        sprint: sprintID,
        modifiedBy: user?.user
      },
      { withCredentials: true }
    )
    .then(res => { 
      // console.log(res);
      if ( res.status === 200 ) {
        setSelectedIssue({
          ...SelectedIssue,
          stage: 'To Do',
          sprint: sprintID
        })
        
      }
    })
    .catch(err => console.log(err))

    if (origIssue.stage.toLowerCase() === 'backlog' && currLoc.pathname.includes('backlog')) {
      setBacklog(
        Backlog?.filter(i => i._id !== origIssue._id)
      )
    }


    if (currLoc.pathname.includes('sprint-board')){
      const stage = titleCase(issue?.stage)
      let prevIssues = items[stage]?.slice();
      prevIssues = prevIssues?.filter(
        issue => issue._id !== SelectedIssue._id
      )
      
      setItems(oldState => {
        return ({
        ...oldState,
        [stage]: prevIssues
      })})
    }
    setIssueModified(true)
  }

  const { Page, setPage, 
    // etOpenDelModal, 
    OpenDelModal, setPrevPage, PrevPage, children } = props;
  const activePageClass = 'bg-[#00000005] text-[#446a67] font-normal shadow-sm';

  useEffect(() => {
    if (!OpenDelModal) {
      setPrevPage(Page)
    }
    // eslint-disable-next-line
  }, [Page])

useEffect(() => console.log(PrevPage), [Page, PrevPage])

const [ShowSprints, setShowSprints] = useState(false);

      
  return (
    <> 

    <div className='flex items-center justify-center mt-1 space-x-4'>
    <div className='flex items-center'> 
  <CustomTooltip 
  title={'Change issue summary'}
  arrow 
  sx={{fontSize: '0.9em'}}
  placement='top'
  > 
  <input 
  type='text' 
  id='edit-issue-summary'
  placeholder={summary?.length ? summary : 'Summary..'}
  className=' 
  focus:border-b-[#4188b4]
  focus:border-b-[0.05em] 
  antialiased w-[15em] hover:bg-gray-200 p-1
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
    <div className=''>
    <CustomTooltip 
    title={'Change issue type'} 
    arrow 
    sx={{fontSize: '0.9em'}}
    placement='top'
    >
    <div className='flex items-center bg-[#f0f0f029] rounded-md 
    shadow cursor-pointer p-[0.025em] hover:bg-[#00000008] ml-3' 
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
         text-[0.825em] mt-3 ml-3
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
              process.env.REACT_APP_API_Issues + '/type',
              {
                issueID: SelectedIssue._id,
                type: type.title,
                modifiedBy: user?.user
              },
              { withCredentials: true }
            )
            .then(res => { 
              // console.log(res)
            })
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
  <div> 

  {/* <CustomTooltip title='Delete Issue' placement='top'> 
  <button className='absolute right-4 drop-shadow-sm top-[1.26em]'
  onClick={() => {
    setOpenDelModal(!OpenDelModal);
    setPage(3)
  }}
  > 

  <AiFillDelete color='#803A3A' className='text-[1.1em] ml-[0.25em]'/>

  </button>
  </CustomTooltip> */}

    {/* {
    OpenDelModal ? <>
    <div className='absolute right-4 mt-8 w-[4em]'> 
    <ul className=' p-1 bg-[#00000010] text-[0.8em]'>
      
    </ul>
    </div>
    </> : null
  } */}
  </div>

  </div>
  <div className='flex items-center justify-center mt-4'>
  <div> 
    <CustomTooltip
    title={'Change sprint'}
    arrow 
    sx={{fontSize: '0.9em'}}
    placement='top'
      >
    <input 
    aria-label='edit-issue-sprint'
    type='text'
    id='edit-issue-sprint'
    className='inline-block bg-[#00000002] 
    rounded-lg outline-none font-normal w-[14em]
    p-1 text-[#686868] placeholder:text-[#606060]
    text-[0.8em] shadow-sm border-b-[0.125em]'
    // placeholder={ SelectedSprint.title }
    value={sprintSearch}
    onChange={handleSprintSearch}
    onFocus={() => {
      setShowSprints(true)
    }}
    onBlur={() => {
      setShowSprints(false)
    }}
    >
      </input>   
    </CustomTooltip>
    <ul 
    className='bg-[#eaeaea] h-auto max-h-[6em] 
    text-[0.8em] overflow-y-auto w-[14em] mt-1 z-20
    rounded-md text-[#6a6a6a] shadow-md absolute' 
        style={{
          visibility: ShowSprints ? 'visible' : 'hidden',
          opacity: ShowSprints ? '100' : '0',
          transition: 'all 0.1s ease-in-out'
        }}
        >
  
      {
      Sprints
      .filter(// eslint-disable-next-line
        sprint => {
          const title = sprint.title;
          if (sprintSearch ==='') 
            return sprint
          
          else if(
            title?.toLowerCase().includes(
              sprintSearch?.toLowerCase()
            )
          ) {
            return sprint
          }
        }
      )
      .map(
        (s, key) =>
        <li key={key}
        className='hover:cursor-pointer z-10
        hover:bg-slate-200 rounded-md p-1'
        onClick={() => {
          // console.log('foo')
          setSprintSearch(s.title);
          return handleSprintSubmit(s._id, SelectedIssue)
        }}
        >
          <div>
            {s.title}
          </div>
        </li>
        )

      }
    </ul>
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
  id='edit-issue-assignee'
  placeholder={'Select assignee'}
  value={Search}
  className='inline-block bg-[#00000009] max-w-[8em]
  rounded-lg outline-none font-normal 
  p-1 text-[#5a5a5a] placeholder:text-[#606060]
   text-[0.8em] shadow-sm'
  onChange={(e) => setSearch(e.target.value)}
  onFocus={() => {
    
    if (Search === 'Unassigned') setSearch('')
    setShowUsers(true);
  }}
  >
  </input>

  </CustomTooltip>


    <ul className='bg-[#eaeaea] h-auto max-h-[6em] 
    text-[0.8em] overflow-y-auto w-[12em] mt-1 z-10
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
          handleAssigneeSubmit(user);
          setShowUsers(false);
          
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
  title={SelectedIssue?.stage?.toLowerCase() === 'backlog' ? 'Stage' : 'Change stage'}
  arrow 
  sx={{fontSize: '0.9em'}}
  placement='right'
  
  > 
  <div className='flex items-center shadow-sm
  whitespace-nowrap text-[0.8em] p-1 pr-2 rounded-md 
  bg-[#001b470a] text-[#606060] w-auto
  max-w-[8.5em] overflow-auto cursor-pointer'
    onClick={() => {
      if (SelectedIssue?.stage?.toLowerCase() !== 'backlog') setShowStages(!showStages)
    }}
    > 
  <div  className='mr-1'
  style={{
    visibility:  SelectedIssue?.stage?.toLowerCase() === 'backlog' ? 'hidden' : 'visible',

  }}> 
  <BiChevronDown className={`${showStages ? 
    'rotate-180' : 'rotate-0'} ease-in-out duration-100`}
  />
  </div>
  <div
  style={{
    marginLeft: SelectedIssue?.stage?.toLowerCase() === 'backlog' ? '-1em' : ''
  }}
  >
    {SelectedIssue?.stage?.toUpperCase()}
  </div>
  </div> 
  </CustomTooltip>

    <ul className='absolute text-[0.8em] 
    mt-1.5 w-[7.5em] bg-[#e4e6e9] cursor-pointer
    text-[#606060] rounded-md shadow-md
    space-y-1 py-1 z-50'
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
            // console.log(prevStageIssues)

            let newStageIssues = items[newStage].slice()
            const isDuplicated = newStageIssues.filter(issue => 
              issue._id === SelectedIssue?._id
            )?.length

            if (!isDuplicated) {
              newStageIssues.push({...SelectedIssue, stage: newStage})
            }

            // console.log('OLD:')
            // console.log(prevStageIssues)
            // console.log('NEW:')
            // console.log(newStageIssues)
            // console.log(newStageIssues)

            setItems(oldState => {
              return ({
              ...oldState,
              [newStage]: newStageIssues,
              [prevStage]: prevStageIssues

            })})
            console.log(Object.keys(items))
            setIssueModified(true);

            // if (currLoc.pathname.includes('sprint-board') ) {
            //   setSelectedSprint(prev => ({
            //     ...prev,
            //     stages: Object.keys(items)
            //     }))
            // }
            
            axios.put(
              process.env.REACT_APP_API_Issues + '/stage',
              {
                issueID: SelectedIssue._id,
                sprintID: SelectedSprint._id,
                stage: stage?.title,
                modifiedBy: user?.user,
              },
              { withCredentials: true }
            )
            .then(res => {
              // console.log(res)
            })
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
    {!OpenDelModal ? 
    <div className='flex items-center 
    justify-center mt-6 space-x-2 font-light 
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
    </div> : null}


    <div className='h-[20vh]'> 
      { children }
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


function titleCase(str) {
  // console.log(str)
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
  }

  return splitStr.join(' '); 
}


export default FormWrapper
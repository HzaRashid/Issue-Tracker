import React, { useEffect } from 'react'
import { useStateContext } from '../../contexts/ContextProvider'
import { ProjContexts } from '../../contexts/ProjectContexts';
import { SprintContexts } from '../../contexts/SprintContexts';
import { useLocation, useParams, Link } from 'react-router-dom';
import { MultipleContainers } from '../../components/Projects/SprintBoard/MultipleContainers';
import axios from 'axios';
import { AiOutlinePlus } from 'react-icons/ai';
import { IssueContexts } from '../../contexts/IssueContexts';
import { TeamContexts } from '../../contexts/TeamContexts';

function SprintBoard() {

  const { ProjectTitle, SprintTitle } = useParams();
  
  const { Users, setUsers } = TeamContexts();

  const { nav, ProjectNav, ScreenWidth } = useStateContext();

  const { 
    Projects, setProjects, 
    SelectedProj, setSelectedProj, 
  } = ProjContexts();

  const { setIssueModal } = IssueContexts();

  const { 
    Sprints, setSprints,
    SelectedSprint, setSelectedSprint, 
    SprintIssues, setSprintIssues,
    setEditStage,
    setSelectedStage,setFixedSprint,
    // eslint-disable-next-line
    items, setItems
  } = SprintContexts();
  // const { SelectedIssue } = IssueContexts();
  // console.log(SelectedSprint)

  useEffect(
    () => {
      if (!Projects?.length) {
        axios.get(process.env.REACT_APP_API_Projects as string, { withCredentials: true })
        .then(res => setProjects(res.data))
      } // eslint-disable-next-line
      }, [Projects?.length])

  useEffect(() => {
    if (!SelectedProj?.title || (
      ProjectTitle && ( SelectedProj?.title !== ProjectTitle ))) {
        setSelectedProj(
          Projects?.filter(
            (project: {title: string}) => project.title === ProjectTitle
          )[0])
        }  
       } ,
    // eslint-disable-next-line
    [Projects, useParams()]
  )
  // console.log(SelectedProj)


  useEffect(() => {
      if (!Sprints?.length) {
        axios.get(
          process.env.REACT_APP_API_Sprints as string, 
          { withCredentials: true })
          .then(res => setSprints(res.data?.filter(
              (sprint: {project: string}) => {
                return sprint.project === SelectedProj?._id
          })))
        }
    },
    // eslint-disable-next-line
    [SelectedProj]
  )
  useEffect(
    () => {
      setSelectedSprint(
        Sprints.filter( // title is unique, correct sprint is returned
          (sprint: {title: string}) => sprint.title === SprintTitle
        )[0]
      )},
    // eslint-disable-next-line
    [SelectedProj, Sprints, useParams()]
  )

  useEffect(() => {
    if (!Users?.length) {
      axios.get(process.env.REACT_APP_API_getUsers as string, { withCredentials: true })
      .then(res => { 
          if (res.status === 200) setUsers(res.data); 
          // console.log(res.data)
        })
        .catch(err => {
          // console.log(err)
        })
    } // eslint-disable-next-line
  }, [Users?.length])


  type Issue = {
    project: string,
    sprint: string,
    stage: string
  }

  useEffect(
    () => {
      axios.get(process.env.REACT_APP_API_Issues as string, { withCredentials: true })
      .then(
        response => {
          if (response.status === 200) {
            setSprintIssues(
              response.data
              .filter(
                (issue: Issue) => (
                  issue.project === SelectedProj?._id && 
                  issue.sprint === SelectedSprint?._id &&
                  issue.stage.toLowerCase() !== 'backlog'
                  ))
                )}
              }) // eslint-disable-next-line
            }, [SelectedProj, SelectedSprint])


  
  // const [items, setItems] = useState({})
  useEffect(
    () => {
      setItems(
        SelectedSprint?.stages?.map(
          (stage: {title:string}) => stage.title)
        .reduce((accumulator: any, value: any) => {
        return {
          ...accumulator, 
          [value]: SprintIssues.filter(
            (issue: Issue) => 
            issue?.stage.toLowerCase() === value?.toLowerCase()
            )
        };
      }, {})

      )
    }, // eslint-disable-next-line
    [SelectedSprint, SprintIssues]
  )

  
  const currLoc = useLocation();
  const currPathname = `${SelectedSprint?.title} - Board`;
  // ${ScreenWidth < 1200 ? 'ml-[3.5em]' : 'ml-[1.5em]'}
  const bothNavsClosed = !ProjectNav && !nav
  const ProjNavOpen  = ProjectNav && !nav
  const NavOpen = !ProjectNav && nav
  
  return (
    <> 

    <div className={`
        ${
          bothNavsClosed ? 'left-[8.75em]' :
          ProjNavOpen ? 'left-[17.75em]' : 
          NavOpen ? 'left-[16em]' : 'left-[25em]'
        }
        absolute font-lato font-light 
        mt-[1em] font-[Open Sans] whitespace-nowrap`}
        style={{
          transition: 'all 0.2s ease-in-out'
        }}
        >
        <Link to='/projects' 
        className='p-1 text-[#4e779f] hover:bg-[#e6e6e6]'
        >
        projects
        </Link>
        {' / '}
        <Link to={`/projects/${SelectedProj?.title}/backlog`} 
        className="p-1 text-[#4e779f] hover:bg-[#e6e6e6]"
        >
        {SelectedProj?.title}
        </Link>
        {' / '}
        <Link to={currLoc.pathname} 
        className="p-1 text-[#4e779f] hover:bg-[#e6e6e6]"
        >
        {currPathname}
        </Link>
        </div>
    <div 
    className={`
    ${
      nav ? 'ml-[12em]' : 'ml-[4.25rem]'
  } 
  body-font font-lato font-light
  subpixel-antialiased 
  ease-in-out duration-[.3s]
  max-h-[100vh] overflow-auto`
  }
  onClick={() => {
    setEditStage(false)
    setSelectedStage(null);
  }}
    >

  <div className={`
    
    ${
    (ProjectNav && ScreenWidth>1024) ? 'ml-[12rem]' : 
    (ProjectNav && ScreenWidth<1024) ? 'ml-[15.5rem]' : 
    (!ProjectNav && ScreenWidth>1024) ? 'ml-[0]':
    (!ProjectNav && ScreenWidth<1024) ? 'ml-[2em]' : 'ml-[0em]'}
    
    ease-in-out duration-[.2s] `
      }
    >

      <div className='flex items-center justify-center mt-[5.5em] font-[Open Sans]'>
        <div className={`
        ${ScreenWidth < 1200 ? 'min-w-[54vw] w-[54vw]' : 'min-w-[60vw]'}
         font-normal flex items-center space-x-6`}> 
       <p className='text-[#202020] text-[1.6em]'>{SelectedSprint?.title} </p>
       <button className='text-[0.95em] flex items-center p-[0.3em]
      bg-[#e2e2e2] hover:bg-[#728391] hover:text-[#e0e0e0] rounded-[0.25em] ease-in-out duration-100'
      onClick={
        () => {
          setIssueModal(true)
          setFixedSprint(SelectedSprint);
        }
      }
      >
      <AiOutlinePlus 
      fontSize={'1em'}
      // color='#505050'
      className='drop-shadow-sm'
      /> 
      <p className='font-normal ml-1'> Create issue </p>
      </button>
      </div>





      </div>

    <div className='flex items-center justify-center mt-[-5em]'>
        {/* <Container items={items} setItems={setItems}/> */}
        {
        items ? 
        <MultipleContainers 
        issues={items} 
        setIssues={setItems} 
        ScreenWidth={ScreenWidth} 
        SelectedSprint={SelectedSprint}
        SprintIssues={SprintIssues}
        />

        : null
      }
        
    </div> 
    </div> 
    </div> 

    </>
  

  )
}

export default SprintBoard
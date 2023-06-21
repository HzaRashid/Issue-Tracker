import React, { useEffect } from 'react'
// import Container from '../../components/Projects/SprintBoard/Container'
import { useStateContext } from '../../contexts/ContextProvider'
import { ProjContexts } from '../../contexts/ProjectContexts';
import { SprintContexts } from '../../contexts/SprintContexts';
import { useLocation, useParams, Link } from 'react-router-dom';
import { MultipleContainers } from '../../components/Projects/SprintBoard/MultipleContainers';
import axios from 'axios';
// import { IssueContexts } from '../../contexts/IssueContexts';
const data = require('../routes.json')

function SprintBoard() {

  const { ProjectTitle, SprintTitle } = useParams();
  
  const { nav, ProjectNav, ScreenWidth } = useStateContext();

  const { 
    Projects, setProjects, 
    SelectedProj, setSelectedProj, 
  } = ProjContexts();

  const { 
    Sprints, setSprints,
    SelectedSprint, setSelectedSprint, 
    SprintIssues, setSprintIssues,
    setEditStage,
    setSelectedStage,
    // eslint-disable-next-line
    items, setItems
  } = SprintContexts();
  // const { SelectedIssue } = IssueContexts();
  // console.log(SelectedSprint)

  useEffect(
    () => {
      axios.get(data.Projects)
      .then(
        res => setProjects(res.data)
      )},
    // eslint-disable-next-line
    []
  )

  useEffect(
    () => {
      setSelectedProj(
        Projects.filter(
          (project: {title: string}) => project.title === ProjectTitle
        )[0]
      )},
    // eslint-disable-next-line
    [Projects, useParams()]
  )
  // console.log(SelectedProj)


  useEffect(
    () => {
      axios.get(data.Sprints)
      .then(
        res => setSprints(
          res.data?.filter(
            (sprint: {project: string}) => sprint.project === SelectedProj?._id
          )
          )
      )
    },
    // eslint-disable-next-line
    [SelectedProj]
  )
  useEffect(
    () => {
      setSelectedSprint(
        Sprints.filter(
          (sprint: {title: string}) => sprint.title === SprintTitle
        )[0]
      )},
    // eslint-disable-next-line
    [SelectedProj, Sprints, useParams()]
  )


  type Issue = {
    project: string,
    sprint: string,
    stage: string
  }

  useEffect(
    () => {
      axios.get(data.Issues)
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

      <div className='flex items-left justify-center mt-[5.5em] font-[Open Sans]'>
        <h1 className={`
        ${ScreenWidth < 1200 ? 'min-w-[54vw] w-[54vw]' : 'min-w-[60vw]'}
        text-[1.4em] font-normal`}> 
       {SelectedSprint?.title} 
        </h1>
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
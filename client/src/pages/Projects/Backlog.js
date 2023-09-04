import React, { useEffect, useState } from "react";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  // PointerSensor,
  useSensor,
  useSensors,
  MouseSensor,
  closestCorners,
  TouchSensor
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useStateContext } from '../../contexts/ContextProvider';
import { TeamContexts } from "../../contexts/TeamContexts";
import { ProjContexts } from '../../contexts/ProjectContexts';
import { SprintContexts } from "../../contexts/SprintContexts";
import { useLocation, useParams, Link } from 'react-router-dom';
import BacklogContainer from '../../components/Projects/Backlog/Container';
import SprintsContainer from '../../components/Projects/Sprints/Container';
import GetBacklogRow from "../../components/Projects/Backlog/GetRow";
import GetSprintRow from "../../components/Projects/Sprints/GetRow";
import axios from "axios";
import { IssueContexts } from "../../contexts/IssueContexts";
import { AuthContexts } from "../../App/Auth";


function Backlog() {
  const { nav, ProjectNav, ScreenWidth } = useStateContext();
  const { 
    Projects, 
    // setProjects, 
    SelectedProj, setSelectedProj, 
    Backlog 
  } = ProjContexts();
  const { 
    Issues, 
    // SearchSptIssues, 
    setSearchSptIssues } = IssueContexts();
  const { user } = AuthContexts();

  const { SprintIssues, SelectedSprint } = SprintContexts();
  const { Users, setUsers } = TeamContexts()
  const currLoc = useLocation();
  let { ProjectTitle } = useParams();

  useEffect(() => {
    if (!Users?.length) {
      axios.get(process.env.REACT_APP_API_getUsers, 
        { withCredentials: true })
        .then(res => { 
            if (res.status === 200) setUsers(res.data); 
            // console.log(res.data)
          })
          .catch(err => {
            // console.log(err)
          })
      } // eslint-disable-next-line
  }, [Users?.length])

  useEffect(
    () => {
      setSelectedProj(
        Projects?.filter(
          project => project.title === ProjectTitle
        )[0]
      )},
    // eslint-disable-next-line
    [Projects, useParams()]
  )

  const currPathname = `${SelectedProj?.title} - Backlog`;


  const [ items, setItems ] = useState([]);
  // to access -issue- fields:
  // [0]: ID
  // [1]: TYPE
  // [2]: SUMMARY
  // [3]: ASSIGNED USER
  // [4]: STAGE 
  // [5]: ISSUE 
  useEffect(() => {
    if (!items?.length) {
      setItems({
        backlog: Backlog?.map(
          issue => {
            const UserMatch = Users.filter(
              user => user._id === issue.assignedTo
            );
            const user = UserMatch[0];
            return ( 
            [
              issue._id, 
              issue.type, 
              issue.summary, 
              user || null,
              issue.stage,
              issue
            ]
            )}
          ),
        sprint: SprintIssues?.map(
          issue => {
            const UserMatch = Users.filter(
              user => user._id === issue.assignedTo
            );
            const user = UserMatch[0];
            return ( 
            [
              issue._id, 
              issue.type, 
              issue.summary, 
              user || null, 
              issue.stage,
              issue
            ]
            )}
          ),
        })
      }
    }  // eslint-disable-next-line
    , [Backlog, SprintIssues, Users])
  // console.log(items)

  const [activeId, setActiveId] = useState();

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 0.5 }
    }),
    useSensor(TouchSensor, {
      activationConstraint: { distance: 0.5 }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
      activationConstraint: { distance: 1 }
    })
  );


  const ContainerIDs = {
    backlog: 'backlog',
    sprint: 'sprint'
  }

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
    mt-[1rem] text-left absolute font-lato font-light
    text-[1rem] whitespace-pre rounded-md`} 
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
    <Link to={currLoc.pathname} 
    className="p-1 text-[#4e779f] hover:bg-[#e6e6e6]"
    >
    {currLoc.pathname === "/projects/" + SelectedProj?.title?.replace(" ", "%20") + '/backlog/proj-nav=true' && currPathname}
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
    >

  <div className={`
    ${
     (ProjectNav && ScreenWidth>1024) ? 'ml-[12rem]' : 
     (ProjectNav && ScreenWidth<1024) ? 'ml-[12.5rem]' : 
     (!ProjectNav && ScreenWidth>1024) ? 'ml-[0]':
     (!ProjectNav && ScreenWidth<1024) ? 'ml-[2em]' : null
 
    }
    ease-in-out duration-[.2s] `
      }
    >

    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCorners}
      >

      {SelectedProj && items.backlog && items.sprint && 
      <>
        <BacklogContainer id={ContainerIDs.backlog} items={items.backlog}/>
        <SprintsContainer id={ContainerIDs.sprint} items={items.sprint}/>

        <DragOverlay className="lg:text-[1.2em] md:text-[1.15em]
        sm:text-[1.15em] xs:text-[1em] text-[1em]"
        >
            {
            !activeId ? null : 
            activeId[4].toLowerCase() === 'backlog' ?
            <GetBacklogRow id={activeId} /> : <GetSprintRow id={activeId} />
            }
        </DragOverlay>

      </>
      }
     </DndContext>
    </div>
    </div>

    
    </>
 
  )

  function findContainer(id) {
    if (id in items) {
      return id;
    }

    return Object.keys(items).find((key) => items[key].includes(id));
  }

  function handleDragStart(event) {
    setSearchSptIssues('')
    console.log(event)
    document.body.style.setProperty('cursor', 'grabbing');
    const { active } = event;
    const { id } = active;
    setActiveId(id);

  }

  function handleDragOver(event) {
    const { active, over, draggingRect } = event;
    const overId = over?.id;
    if (!overId) return;
    
    const { id } = active;


    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);



    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setItems((prev) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];

      const activeIndex = activeItems.indexOf(id);
      const overIndex = overItems.indexOf(overId);

      let newIndex;
      if (overId in prev) {

        newIndex = overItems.length + 1;
      } else {
        const isBelowLastItem =
          over &&
          overIndex === overItems.length - 1 && draggingRect &&
          draggingRect.offsetTop > over.rect.offsetTop + over.rect.height;

        const modifier = isBelowLastItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter((item) => item !== active.id)
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          items[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length)
        ]
      };
    });
  }


  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) {
      return;
    }
    const { id } = active;
    const { id: overId } = over;


    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = items[activeContainer].indexOf(active.id);
    const overIndex = items[overContainer].indexOf(overId);
    // console.log(id)
    console.log(activeContainer)
    // move issue from backlog to sprint
    if ( 
      // id[4]?.toLowerCase() === ContainerIDs.backlog && 
      overContainer === ContainerIDs.sprint ) {
      
       axios.put(
        process.env.REACT_APP_API_Issues + '/stage',
        {

            issueID: id[0],
            sprint: SelectedSprint._id,
            sprintID: Issues.filter(i => i._id = id[0])
                            .map(i => i.sprint),
            ToBacklogOrSprint: true,
            stage: 'to do',
            modifiedBy: user.user
            

        }, { withCredentials: true }
       )
       .then(res => {console.log(res); id[4] = 'to do'})
       .catch(err => console.log(err))

    } 
    // move issue from sprint to backlog
    else if (
    overContainer === ContainerIDs.backlog ) {            
        
        axios.put(
          process.env.REACT_APP_API_Issues + '/stage',
          {

              issueID: id[0],
              sprint: '',           // new sprint
              sprintID: Issues.filter(i => i._id = id[0])
                              .map(i => i.sprint),  // current sprint
              ToBacklogOrSprint: true,
              stage: 'backlog',
              modifiedBy: user.user
              

          },
          { withCredentials: true }
        )
        .then(res => {console.log(res); id[4] = 'backlog'})
        .catch(err => console.log(err))

    }


    if (activeIndex !== overIndex) {
      setItems((items) => ({
        ...items,
        [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex)
      }));

    }
    
    
    document.body.style.setProperty('cursor', '');

    setActiveId(null);

   
  }

}

export default Backlog;
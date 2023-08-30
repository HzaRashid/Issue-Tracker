import React, { useEffect, useState } from 'react'
import { TeamContexts } from '../../../contexts/TeamContexts';
import { AiFillCaretDown, AiFillCaretUp, AiOutlineClose, AiOutlineCloseCircle } from 'react-icons/ai';
import { CustomTooltip } from '../../CustomTooltip';
import { BsCheck, BsCheck2Circle } from 'react-icons/bs';
import stringAvatar from '../../utils/UserAvatar/StringAvatar';
import { Avatar } from '@mui/material';
import { ProjContexts } from '../../../contexts/ProjectContexts';
import { gridPaginatedVisibleSortedGridRowIdsSelector } from '@mui/x-data-grid'
import axios from 'axios';
const data = require('../../../pages/routes.json')

function AssignToProjForm() {
    const { 
      AssignProjModal, setAssignProjModal, 
      SelectedGridUsers, setSelectedGridUsers, Users, tableRef
     } = TeamContexts();
     const { Projects } = ProjContexts();
     const [Search, setSearch] = useState('');
     const [showUsers, setShowUsers] = useState(false);
     const [ProjSearch, setProjSearch] = useState('');
     const [ShowProj, setShowProj] = useState(false);
     const [SelectedProj, setSelectedProj] = useState({});

     function getAssignee (assigneeID) {
      const user = Users.filter(u => {
        return u._id === assigneeID
      })[0];
      return user
    }
    const [InitTeam, setInitTeam] = useState([])
    useEffect(() => {
      // setProjTitle(SelectedProj?.title);
      // console.log(SelectedProj)
      // const teamIds = SelectedProjModal?.assignedTo?.slice()
      const teamIds = Users?.filter(
        u => u.projects.includes(SelectedProj?._id)
      )
      .map(u => u._id)
      // setProjTeam(teamIds?.map(id => getAssignee(id)));
      setInitTeam(teamIds);

    }
    
    , [SelectedProj, SelectedProj?.title, SelectedProj?.assignedTo, Users]);

    const selUsersStyle = 'inline-block lg:w-[26.5em] md:w-[26.5em] w-[50vw] text-[0.75em] whitespace-nowrap ml-[-0.45em] break-normal overflow-x-auto p-1'
    
    return (
      <>
      <div className='sticky top-0 bg-inherit'>
      <h1 className='p-3 text-[1.05em] whitespace-pre
      text-[#474747] font-normal break-words '>
      {
       'Add users to project'
      }
      </h1>
      </div>

      <div className='max-h-[20em] overflow-auto'> 
      <div className='flex items-center justify-center w-[100%] mt-8'>
  <div className=''>
  <p
      className='block mb-[0.2em] 
      text-[0.8em] font-bold text-[#303030]'
      >
        Project
      </p>
      <div className='flex items-center lg:w-[20em] md:w-[20em] 
      w-[50vw]'>

{    
!SelectedProj?.title ? <>
<input id='update-proj' type='text' placeholder='Search projects..' 
      className=' block bg-[#00000010] lg:w-[20em] md:w-[20em] 
      w-[50vw] rounded-lg outline-none font-normal text-[0.95em]
      p-[0.2em] placeholder:text-[#686868] placeholder:font-light'
      value={ProjSearch}
      onChange={(e) => setProjSearch(e.target.value)}
      onClick={() => setShowProj(true)}
      style={{
        zIndex: 50
      }}
      >
      </input>
 

      <CustomTooltip title={ShowProj ? 'Close List' : 'Open List'}>
      <button onClick={() => setShowProj(!ShowProj)}>
        {ShowProj ? 
           <AiFillCaretUp color='#505050'/> : 
           <AiFillCaretDown color='#505050'/>
        }
      </button>
      </CustomTooltip>    
      </>
      : 
      <div className='flex items-center p-1 rounded-md bg-[#e2e2e2]'>
        <p className='text-[0.95em]'> 
        {SelectedProj.title}
        </p>
        <button
        className='ml-2'
         onClick={() => {
          setSelectedProj({});
          setShowProj(true);
          
        }}> 
        <AiOutlineCloseCircle className='text-[#404040]'
       />
       </button>
      </div>
      }
      </div>

      {
    ShowProj && 
    <ul className='bg-[#eaeaea] h-[8em] overflow-y-auto
    lg:w-[20em] md:w-[20em] 
      w-[50vw] shadow-sm' 
    >
    {
      Projects
      ?.filter(// eslint-disable-next-line
        proj => {
          if (ProjSearch==='') {
            return proj
          } 
          else if (
            `${proj.title}`
              .toLowerCase()
              .includes(ProjSearch.toLowerCase())
              ) {
          return proj
        }
      }
      )
      .map(
        (proj, key) =>
        <li key={key}
        className={`
          'bg-[#dbdbdb] hover:bg-[#d3d3d3]
          hover:cursor-pointer p-2  first:mt-0
          text-[0.85em] font-normal text-[#505050]
          `}
        
        onClick={() => {
          setSelectedProj(proj);
          setShowProj(false);
          setShowUsers(true);
        }}
        >

          <div className='flex items-center justify-between'>
            {proj.title}
          
          </div>

        </li>
      )
        }
    </ul>
    }

  </div>
</div>
      <div className='flex items-center justify-center w-[100%] mt-8'>

      <div className=''>
      <p
      className='block mb-[0.2em] 
      text-[0.8em] font-bold text-[#303030]'
      >
        Selected users
      </p>
      {

        SelectedGridUsers
        ?.length > 0 &&

      <ul className={`${
        SelectedGridUsers.every(u => InitTeam.includes(u._id)) ? '' : selUsersStyle
      }`}>
        {

          SelectedGridUsers?.slice()
          .map(
            (user, key) => {
              // console.log(ProjTeam)
              // const user = Users.filter(u => u._id === userID)[0];
              if (InitTeam?.length && InitTeam.includes(user._id)) {
                return null
              }
              return (
              <li className='inline-block font-normal' key={key}>
                <div className='flex items-center'>
                <div className='flex items-center m-1 p-1 
                bg-[#d5d5d5] rounded-md shadow-sm'>
                  {user.firstName + ' ' + user.lastName}
                  <CustomTooltip title='Remove'>
                  <button 
                  onClick={() => {
                    var selUsers = [...SelectedGridUsers];
                    var index = selUsers.indexOf(user);
                    // console.log(index);
                    selUsers.splice(index, 1);
                    // console.log(selUsers)
                    // setSelectedGridUsers(selUsers)

                    const visibleRows = gridPaginatedVisibleSortedGridRowIdsSelector(tableRef);
                    if (visibleRows.length === 0) {
                    return;
                    }
                    const idx = Users.indexOf(user)
                    // console.log(isSelectedUser)
                    tableRef?.current.selectRow(
                      visibleRows[idx],
                      false
                    );
                  }}
                    >
                  <AiOutlineCloseCircle
                  className='ml-1 text-[1.1em]' color='#303030'/>
                  </button>
                  </CustomTooltip>
                </div>
                </div>
              </li>
            )}

          )
        }
      </ul>
      }
      
      <div className='flex items-center lg:w-[20em] md:w-[20em] 
      w-[50vw]'>

      <input id='update-proj-users' type='text' placeholder='Search users..' 
      className=' block bg-[#00000010] lg:w-[20em] md:w-[20em] 
      w-[50vw] rounded-lg outline-none font-normal text-[0.95em]
      p-[0.2em] placeholder:text-[#686868] placeholder:font-light'
      value={Search}
      onChange={(e) => setSearch(e.target.value)}
      onClick={() => setShowUsers(true)}
      style={{
        zIndex: 50
      }}
      >
      </input>

      <CustomTooltip title={showUsers ? 'Close List' : 'Open List'}>
      <button onClick={() => setShowUsers(!showUsers)}>
        {showUsers ? 
           <AiFillCaretUp color='#505050'/> : 
           <AiFillCaretDown color='#505050'/>
        }
      </button>
      </CustomTooltip>
      </div>
    {
    showUsers && 
    <ul className='bg-[#eaeaea] h-[8em] overflow-y-auto
    lg:w-[20em] md:w-[20em] mt-1
      w-[50vw] shadow-sm rounded-md' 
    >
    {
      Users
      ?.filter(// eslint-disable-next-line
        user => {
          if (Search==='') {
            return user
          } 
          else if (
            `${user.firstName + ' ' + user.lastName}`
              .toLowerCase()
              .includes(Search.toLowerCase())
              ) {
          return user
        }
      }
      )
      .map(
        (user, key) => { 
        if ( InitTeam.includes(user._id)) {
          return (        
          <li key={key}
            className={`p-2  first:mt-0 bg-[#dbdbdb]
              text-[0.85em] font-normal text-[#505050]
              `}
            >
              <div className='flex items-center space-x-2'> 
              <Avatar className=' antialiased'
                {...stringAvatar(
                  user.firstName + ' ' + user.lastName,
                  22, 
                  22, 
                  '0.65em'
                  )
                } 
              />
              <div className='w-[100%] flex items-center'>
                <p className='flex w-[100%]'> 
                {user.firstName?.concat(' ', user.lastName) }
              </p>
              <div className='w-[100%] flex justify-end text-[0.8em]'>
                Already included
              </div>
              </div>
              </div>
            </li>)
        } else
        return (
        <li key={key}
        className={`${
        SelectedGridUsers
          ?.filter(
            u => u._id===user._id
          )
          ?.length > 0 ? 
          'bg-[#dbdbdb]' : 'bg-[#eaeaea] hover:bg-[#dfe7ee] rounded-md'
        } 
          hover:cursor-pointer p-2  first:mt-0
          text-[0.85em] font-normal text-[#505050]
          `}
        
        onClick={() => {
          // console.log('clked')
          
          const alreadyUser = SelectedGridUsers
                              ?.filter(
                              u => u._id===user._id
                              );
          
          if (!alreadyUser?.length) {
            if (SelectedGridUsers?.length) {
              setSelectedGridUsers(
                [...SelectedGridUsers, user]
                )
            } else setSelectedGridUsers( [user] )
              
            const visibleRows = gridPaginatedVisibleSortedGridRowIdsSelector(tableRef);
            if (visibleRows.length === 0) {
            return;
            }
            const idx = Users.indexOf(user)
            // console.log(isSelectedUser)
            tableRef?.current.selectRow(
              visibleRows[idx],
              true
            );

          } 

          else {

            setSelectedGridUsers(
              SelectedGridUsers
              ?.filter(
                u => u._id !== alreadyUser[0]._id
              ))

            const visibleRows = gridPaginatedVisibleSortedGridRowIdsSelector(tableRef);
            if (visibleRows.length === 0) {
            return;
            }
            const idx = Users.indexOf(user)
            // console.log(isSelectedUser)
            tableRef?.current.selectRow(
              visibleRows[idx],
              false
            );
            }

        }
        }
        >
          <div className='flex items-center space-x-2'> 
          <Avatar className=' antialiased'
            {...stringAvatar(
              user.firstName + ' ' + user.lastName,
              22, 
              22, 
              '0.65em'
              )
            } 
          />
          <div className='flex items-center justify-between'>
            {user.firstName + ' ' + user.lastName}
          
          <div className=' ml-[0.5em] mt-[0.15em]'>
          { 
          SelectedGridUsers
          ?.filter(
            u => u._id===user._id
            )
            ?.length > 0 &&
          <BsCheck color='#5B9960' fontSize={'1.15em'}/>
          }
          </div>
          </div>
          </div>
        </li>)

        }
      )
        }
    </ul>
    }

  </div>
  </div>

  </div>



    <div className='text-center mt-[3.25em]'>
    <CustomTooltip title='Cancel' placement='top'>
    <button 
    className='float-left hover:bg-[#e2e2e2] 
    rounded-lg ml-[0.25em] ease-in-out duration-100'
    onClick={() => {
      setAssignProjModal(false);

    }}
    >
    <AiOutlineClose fontSize={'1.75em'} color='#202020'
    className='drop-shadow-sm p-1'
    />
    </button>
    </CustomTooltip>

      {
    (

    SelectedGridUsers?.length > 0
    && SelectedProj?.title 

    ) &&

    <CustomTooltip title='Submit' placement='top'>
    <button type="submit"
    className='float-right hover:bg-[#e2e2e2] 
    mr-[0.25em] ease-in-out duration-100'
    onClick={() => {

      axios.put(data.Projects + '/add-team',
      {
        projectID: SelectedProj?._id,
        assignedTo: SelectedGridUsers?.map(u => u._id)
      }
      )
      .then(res => {
        // console.log(res)
      })
      .catch(err => {
        // console.log(err)
        }
      )

    }}
    >
      <BsCheck2Circle fontSize={'1.5em'} color='#538A58'/>
    </button>

    </CustomTooltip>
    }
      </div>

      </>

    )
}

export default AssignToProjForm
import React, { useEffect, useRef, useState } from 'react'
import { IssueContexts } from '../../../contexts/IssueContexts';
import { TeamContexts } from '../../../contexts/TeamContexts';
import Avatar from '@mui/material/Avatar';
import stringAvatar from '../../utils/UserAvatar/StringAvatar';
// import { AuthContexts } from '../../../App/Auth';
import { formatDistance } from 'date-fns';
import { BsDot, BsArrowRightShort } from 'react-icons/bs';
import { SprintContexts } from '../../../contexts/SprintContexts';
// import axios from 'axios';



function History( { IssueVersions, setIssueVersions } ) {
  // ====> use "IV" to abbreviate "IssueVersions" <=====
  const { SelectedIssue } = IssueContexts();
  const { Sprints } = SprintContexts();
  const { Users } = TeamContexts();
  const userList = Users.slice();
  const IVSourceRef = useRef(null);

  const setIVs = (e) => {
    const parsedIVs = JSON.parse( e.data )
    setIssueVersions([...parsedIVs, {
      ...SelectedIssue,
      dateOfUpdate: new Date(-8640000000000000),
      issueID: SelectedIssue?._id,
      wasModified: true
    }]);
  }
  useEffect(() => {
    if (!SelectedIssue?._id) return;

    IVSourceRef.current = new EventSource(
      `${process.env.REACT_APP_API_IssueVersionsSSE}/${SelectedIssue?._id}`,
      { withCredentials: true })

      IVSourceRef.current.onmessage = ( e ) => setIVs(e)

      IVSourceRef.current.onerror = () => {
        IVSourceRef.current.close();
      }
      return () => {
        IVSourceRef.current.close();
      }; 
      // eslint-disable-next-line
  }, [SelectedIssue?._id])


  const [ SelectedIssuer, setSelectedIssuer ] = useState({});

  useEffect(() => {
    const checkIssuer = Users?.filter( u => u._id === SelectedIssue?.createdBy )
    if (checkIssuer.length) setSelectedIssuer(checkIssuer[0])
  }, [Users, SelectedIssue])


  return (
    <div
    className='flex items-center justify-center mt-3 ' 
    >
    <ul className='h-auto max-h-[8em] overflow-scroll'> 
      {
        IssueVersions
        ?.filter(
          iv => (iv?.issueID === SelectedIssue?._id
                    && iv?.wasModified === true)
        )
        ?.sort(
          (a,b) => (new Date(b?.dateOfUpdate) - new Date(a?.dateOfUpdate))
          )
        ?.map(
          (v, key) => {
            if (v._id !== SelectedIssue?._id) return (
          <li key={key}
          className='text-[0.7em] flex 
          items-center justify-start space-x-3
          mt-5 first:mt-0 text-[#303030] '
          >
            {renderAvatar(v, userList)}
            <div>
              <div className='flex items-center justify-center '>
                <div>
                { RenderUpdate(v, userList) }
                </div>
                <BsDot color='#0000007e'/>
                <div className='text-[#0000007e] whitespace-pre'>
                { DateToString(v) }
                </div>
              </div>

              <div className='flex items-center '>

                <div className='text-[#303030] bg-[#00000010] p-[0.2em] rounded-md mr-[0.4em]'>
                { titleCase(getModFields(v, Sprints, Users)?.oldField || '') }
                {/* {console.log(v)} */}
                </div>
                <BsArrowRightShort className='mt-[0.2em]' size={'1.6em'}/>
                <div className='text-[#193142] bg-gray-200 p-[0.2em] rounded-md ml-[0.4em]'>
                { titleCase(getModFields(v, Sprints, Users)?.newField) }
                </div>

              </div>


            </div>

          </li>)

          else {
            return (
            <li
            key={key}
          className='text-[0.7em] flex 
          items-center justify-start space-x-3
          mt-5 first:mt-0 text-[#303030] '
      >
      <Avatar 
      {...stringAvatar(
        SelectedIssuer?.firstName + ' ' + SelectedIssuer?.lastName,
        24, 
        24, 
        '0.75em'
        )
      }  
      />
      <div>
        <div className='flex items-center justify-center '>
          <div>
          {v?._id && RenderCreated(v, Users) }
          </div>
        </div>
        <div className='text-[#0000007e] whitespace-pre'>
          {v?._id &&  DateToString2(v) }
          </div>
      </div>
      </li> 
          )}

          }
          )}
      {/* <li
      className='text-[0.7em] flex 
          items-center justify-start space-x-3
          mt-5 first:mt-0 text-[#303030] '
      >
      <Avatar 
      {...stringAvatar(
        SelectedIssuer?.firstName + ' ' + SelectedIssuer?.lastName,
        24, 
        24, 
        '0.75em'
        )
      }  
      />
      <div>
        <div className='flex items-center justify-center '>
          <div>
          {SelectedIssue?._id && RenderCreated(SelectedIssue, Users) }
          </div>
        </div>
        <div className='text-[#0000007e] whitespace-pre'>
          {SelectedIssue?._id &&  DateToString2(SelectedIssue) }
          </div>
      </div>
      </li>  */}

      </ul>
    </div>
  )
}

function renderAvatar(issueVersion, Users) {
  const v = issueVersion;
  // console.log(v)
  const userList = Users.slice()
  const User = userList.filter(u => u._id === v.modifiedBy)[0];
  return (
    <Avatar 
    {...stringAvatar(
      User?.firstName + ' ' + User?.lastName,
      24, 
      24, 
      '0.75em'
      )
    }  
    />
  )
}


function RenderCreated (selectedIssue, Users) {
  const issue = selectedIssue;
  // console.log(selectedIssue)
  const user = Users.filter(u => u._id === issue?.createdBy)[0];
  
  return (
    <div key={user?._id}
    className='flex items-center justify-center whitespace-pre'>
      <div className='font-bold'>
      {user?.firstName + ' ' + user?.lastName + ' '}
      </div>
      <div className='font-normal'>
      {'created the issue'}
      </div>
    </div>

  )

}


function RenderUpdate (issueVersion, Users) {
  const v = issueVersion;
  const user = Users.filter(u => u?._id === v?.modifiedBy)[0];
  
  return (
    <div key={user?._id}
    className='flex items-center justify-center whitespace-pre'>
      <div className='font-bold'>
      {user?.firstName + ' ' + user?.lastName + ' '}
      </div>
      <div className=''>
      {'updated the '}
      </div>
      <div className='font-bold'>
        {v?.modifiedField !== 'assignedTo' ? titleCase(v?.modifiedField) : "Assignee"}
      </div>
    </div>

  )

}

// prints elapsed time (since issue was updated)
// if less than a week (e.g., 2 hours ago, 6 days ago)
// otherwise prints the date
function DateToString (issueVersion) {
    const updateDate = new Date(issueVersion.dateOfUpdate);
    const sevenDaysAgoDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    if (updateDate < sevenDaysAgoDate) {
      return (
        updateDate.toDateString() + ' at ' 
        + updateDate.toLocaleTimeString().slice(0,4)
        + updateDate.toLocaleTimeString().slice(7)
        )
    }
  else return formatDistance(
      updateDate, new Date(), 
      { addSuffix: true,
        includeSeconds: true
      });
}

function DateToString2 (selectedIssue) {
  if (!selectedIssue) return null
  const updateDate = new Date(selectedIssue?.createdAt);
  const sevenDaysAgoDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

if (!updateDate) return
// console.log(updateDate.toDateString())
  if (updateDate < sevenDaysAgoDate) {
    return (
      updateDate.toDateString() + ' at ' 
      + updateDate.toLocaleTimeString().slice(0,4)
      + updateDate.toLocaleTimeString().slice(7)
      )
  }
return formatDistance(
    updateDate, new Date(), 
    { addSuffix: true,
      includeSeconds: true
    });
}


function getUserName(userID, Users) {
  // console.log(userID)
  var newAssignee = Users?.filter(u => u._id.toString() === userID?.toString())[0];
  // console.log(newAssignee)
  
  return newAssignee?.firstName + ' ' + newAssignee?.lastName
}

// **** **** **** **** **** **** **** **** **** **** **** **** ****  
// ** the following issue fields can be modified by the user: 
// type
// summary
// assignee
// stage
// sprint

// takes as input a json object : issue version document
// and a list : the project's Sprints
// returns both the old and the new values 
// of the modified field as an object
function getModFields (issueVersion, Sprints, Users) {
  const field = issueVersion?.modifiedField;
  const iv = issueVersion;
  // console.log(field)
  // if (field === 'assignedTo') return getUserName(iv.newAssignee, Users)
  switch ( field?.toLowerCase() ) {

    case 'type':
      return ({
        oldField:   iv.type,
        newField:   iv.newType
      })

    case 'summary':
      return ({
        oldField:   iv.summary,
        newField:   iv.newSummary
      })

    case 'assignedto':
      return ({
        oldField:  iv.assignedTo ? getUserName(iv.assignedTo, Users) 
                                 : 'Unassigned',
        newField:  getUserName(iv?.newAssignee, Users)
      })

    case 'stage':
      return ({
        oldField:   iv.stage,
        newField:   iv.newStage
      })

    case 'sprint':
      return ({
        oldField: getSprintOldField(iv, Sprints),
        newField: getSprintNewField(iv, Sprints),
      })
      default:
        return ;

  }

}


function getSprintOldField (IssueVersion, Sprints) {
  // console.log(IssueVersion)
  if (IssueVersion?.stage?.toLowerCase() !== 'backlog') {
    const sprints = Sprints.slice()
    return (
      sprints?.filter(s => s?._id === IssueVersion?.sprint)?.map(s => s?.title)[0]
      )
  }
  return 'backlog'
}

function getSprintNewField (IssueVersion, Sprints) {

  if (IssueVersion?.newStage?.toLowerCase() !== 'backlog') {
    const sprints = Sprints.slice()
    return (
      sprints?.filter(s => s?._id === IssueVersion?.newSprint)?.map(s => s?.title)[0]
      )
  }
  return 'backlog'
}


function titleCase(str) {
  if (!str) return
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
  }

  return splitStr.join(' '); 
}


export default History
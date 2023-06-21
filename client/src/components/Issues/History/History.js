import React, { useEffect, useState } from 'react'
import { IssueContexts } from '../../../contexts/IssueContexts'
import { TeamContexts } from '../../../contexts/TeamContexts';
import Avatar from '@mui/material/Avatar';
import stringAvatar from '../../utils/UserAvatar/StringAvatar';
import { AuthContexts } from '../../../App/Auth';
import { formatDistance } from 'date-fns';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { BsDot } from 'react-icons/bs';
const data = require('../../../pages/routes.json')


function History() {
  const { SelectedIssue } = IssueContexts();
  const { Users } = TeamContexts();
  const [ IssueVersions, setIssueVersions ] = useState([]);
  const { user } = AuthContexts();
  const loggedInUser = Users.filter(u => u?._id === user?.user)[0];
  const [ isListen, setIsListen ] = useState(false)
  useEffect(() => {
    if (!isListen){
      const events = new EventSource(data.IssueVersions);
      events.onmessage = ( e ) => {
          const parsedComments = JSON.parse( e.data )?.msg
          setIssueVersions(parsedComments);
        }
        setIsListen(true);
      }  // eslint-disable-next-line
  }, [isListen, IssueVersions])

  return (
    <div
    className='flex items-center justify-center mt-3' 
    >
    <ul className='h-auto max-h-[8em] overflow-scroll'> 
      {
        IssueVersions
        .filter(
          iv => iv?.issueID === SelectedIssue?._id
                   && iv.wasModified === true
        )
        .map(
          v => 
          <li key={v?._id}
          className='text-[0.7em] flex 
          items-center justify-start space-x-3
          mt-5 first:mt-0 text-[#303030] '
          >

            <Avatar 
            {...stringAvatar(
            loggedInUser.firstName + ' ' + loggedInUser.lastName,
            24, 
            24, 
            '0.75em'
            )}  
            />
            <div>
              <div className='flex items-center justify-center '>
                <div>
                { RenderUpdate(v, Users) }
                </div>
                <BsDot color='#0000007e'/>
                <div className='text-[#0000007e] whitespace-pre'>
                { DateToString(v) }
                </div>
              </div>

              <div className='flex items-center '>

                <div className='text-[#303030] bg-[#00000010] p-[0.2em] rounded-md mr-[0.4em]'>
                { titleCase(getModFields(v)?.oldField) }
                {console.log(v)}
                </div>
                <AiOutlineArrowRight className='mt-[0.2em]'/>
                <div className='text-[#193142] bg-gray-200 p-[0.2em] rounded-md ml-[0.4em]'>
                { titleCase(getModFields(v)?.newField) }
                </div>

              </div>


            </div>

          </li>
          )
        
      }
      </ul>
    </div>
  )
}



function RenderUpdate (issueVersion, Users) {
  const v = issueVersion;
  const user = Users.filter(u => u._id === v.modifiedBy)[0];
  
  return (
    <div key={user?._id}
    className='flex items-center justify-center whitespace-pre'>
      <div className='font-bold'>
      {user.firstName + ' ' + user.lastName + ' '}
      </div>
      <div className=''>
      {'updated the '}
      </div>
      <div className='font-bold'>
        { titleCase(v?.modifiedField) }
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


// **** **** **** **** **** **** **** **** **** **** **** **** ****  
// ** the following issue fields can be modified by the user: 
// type
// summary
// assignee
// stage
// sprint

// takes as input a json object -> issue version document
// returns both the old and the new values 
// of the modified field as an object
function getModFields (issueVersion) {
  const field = issueVersion.modifiedField;
  const iv = issueVersion;
  console.log(field)
  switch ( field.toLowerCase() ) {

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

    case 'assignee':
      return ({
        oldField:  iv.assignedTo,
        newField:  iv.newAssignee
      })

    case 'stage':
      return ({
        oldField:   iv.stage,
        newField:   iv.newStage
      })

    case 'sprint':
      return ({
        oldField:   iv.sprint,
        newField:   iv.newSprint
      })
      default:
        return;

  }

}

function titleCase(str) {
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
  }

  return splitStr.join(' '); 
}





export default History
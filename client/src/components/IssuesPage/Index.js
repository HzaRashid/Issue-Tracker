import React, { useEffect } from 'react'
import AssigneeList from './AssigneeList'
import PostedList from './PostedList'
import { IssueContexts } from '../../contexts/IssueContexts';
import { ProjContexts } from '../../contexts/ProjectContexts';
import { AuthContexts } from '../../App/Auth';
import axios from 'axios';

function Index() {
  useEffect(() => {}, [])
  const { 
    Issues, setIssues,
    AsgndIssues, setAsgndIssues,
    PstdIssues, setPstdIssues
    } = IssueContexts();
  const { Projects, setProjects } = ProjContexts();
  const { user } = AuthContexts();

  useEffect(() => {
    if (
      !Issues?.length ||
      !AsgndIssues?.length ||
      !PstdIssues?.length ||
      !Projects?.length

    ) {
      const withCreds = { withCredentials: true };
      axios.all([
        axios.get(process.env.REACT_APP_API_Issues, withCreds),
        axios.get(process.env.REACT_APP_API_Projects, withCreds),
      ])
      .then(axios.spread((res1, res2) => {
                setIssues(res1.data)
                setProjects(res2.data);
      }));
      }

    setAsgndIssues(Issues?.filter(
      i => { return i?.assignedTo === user.user}
      ))
    setPstdIssues(Issues?.filter(
      i => { return i?.createdBy === user.user}
      ))
        // eslint-disable-next-line
    }, [Issues, Projects])

  return (
    <>

    <div className='overflow-hidden z-0'>

    <AssigneeList/>

    </div> 
    <div className='overflow-hidden z-0'>

    <PostedList/>

    </div> 

     </>
  )
}



export default Index
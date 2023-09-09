import React, { useEffect } from 'react'
import List from '../../components/Projects/Team/List'
import PageMargin2 from '../../components/utils/PageMargin2';
import { useParams } from 'react-router-dom';
import { ProjContexts } from '../../contexts/ProjectContexts';
import { SprintContexts } from '../../contexts/SprintContexts';
import axios from 'axios';
import { TeamContexts } from '../../contexts/TeamContexts';


function Team() {
    const { 
        Projects,
        SelectedProj, setSelectedProj, 
      } = ProjContexts();
    let { ProjectTitle } = useParams();
    const { setSprints } = SprintContexts();
    const { Users, setUsers } = TeamContexts();


    useEffect(() => {
      const withCreds = { withCredentials: true }
      if (
        !Projects?.length ||
        !Users?.length     
        ) {
          axios.all([
            axios.get(process.env.REACT_APP_API_Projects, withCreds),
            axios.get(process.env.REACT_APP_API_getUsers, withCreds),
            axios.get(process.env.REACT_APP_API_Sprints, withCreds),
          ])
          .then(axios.spread((res1, res2, res3, res4) => {
            var project = res1.data?.filter(p => p.title === ProjectTitle)[0]
            setSelectedProj({...project})
            setUsers(res2.data)
            setSprints(res3.data.filter(s => s.project === project._id))

          return () => {}
        }))
      } else {
      var project = Projects?.filter(p => p.title === ProjectTitle)[0]
      setSelectedProj({...project})
      axios.get(process.env.REACT_APP_API_Sprints, withCreds)
      .then(res => setSprints(res.data.filter(s => s.project === project?._id)))
    }
    // eslint-disable-next-line
    }, [ProjectTitle, Projects])
  return (
    <>

    <PageMargin2>
    <List SelectedProj={SelectedProj} />
    </PageMargin2>

    </>
  )
}


export default Team
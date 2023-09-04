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
      if (!SelectedProj?.title || (
        ProjectTitle && ( SelectedProj?.title !== ProjectTitle ))) {
          setSelectedProj(
            Projects.filter(
              p => p.title === ProjectTitle
            )[0])
          }  
         } ,
      // eslint-disable-next-line
      [Projects, useParams()]
    )
      useEffect(
        () => {
          axios.get(process.env.REACT_APP_API_Sprints, 
            { withCredentials: true })
          .then(
            res => setSprints(
              res.data?.filter(
                s => s.project === SelectedProj?._id
              )
              )
          )
        },
        // eslint-disable-next-line
        [SelectedProj]
      )

      useEffect(() => {
        if (!Users?.length) axios.get(
          process.env.REACT_APP_API_Users,
          { withCredentials: true }
        )
        .then(res => setUsers(res.data))
        .catch(err => console.log(err))
        // eslint-disable-next-line
        }, [])
  return (
    <>

    <PageMargin2>
    <List SelectedProj={SelectedProj} />
    </PageMargin2>

    </>
  )
}


export default Team
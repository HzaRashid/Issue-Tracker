import React, { useEffect } from 'react'
import PageMargin from '../../components/utils/PageMargin'
import List from '../../components/Projects/Team/List'
import { useStateContext } from '../../contexts/ContextProvider';
import PageMargin2 from '../../components/utils/PageMargin2';
import { useParams } from 'react-router-dom';
import { ProjContexts } from '../../contexts/ProjectContexts';
import { SprintContexts } from '../../contexts/SprintContexts';
import axios from 'axios';

const data = require('../../pages/routes.json')
function Team() {
    const { nav, ProjectNav } = useStateContext();
    const bothNavsClosed = !ProjectNav && !nav
    const ProjNavOpen  = ProjectNav && !nav
    const NavOpen = !ProjectNav && nav
    const { 
        Projects,
        SelectedProj, setSelectedProj, 
      } = ProjContexts();
    let { ProjectTitle } = useParams();
    const { setSprints } = SprintContexts();
    useEffect(
        () => {
          setSelectedProj(
            Projects.filter(
              project => project.title === ProjectTitle
            )[0]
          )},
        // eslint-disable-next-line
        [Projects, useParams()]
      )
      useEffect(
        () => {
          axios.get(data.Sprints)
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
  return (
    <>

    <PageMargin2>
    <List SelectedProj={SelectedProj} />
    </PageMargin2>

    </>
  )
}


export default Team
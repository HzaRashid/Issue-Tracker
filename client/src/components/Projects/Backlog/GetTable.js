import React from 'react'
// import { ProjContexts } from '../../../contexts/ProjectContexts'
// import { useStateContext } from '../../../contexts/ContextProvider'
import BacklogTable from './BacklogTable';
import Empty from './Empty';
function GetTable( props ) {




    const { id, items, Backlog } = props;
  return (
    <>
    {Backlog && Backlog.length ? <BacklogTable id={id} items={items}/> : <Empty/>}

    </>



  )
}

export default GetTable
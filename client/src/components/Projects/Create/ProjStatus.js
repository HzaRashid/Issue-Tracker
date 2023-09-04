import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { ProjContexts } from '../../../contexts/ProjectContexts';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

function ProjStatus() {
  // 200: success
  // 500: project post request failed
  // 501: users put request failed
    const { 
      ProjStatus, setProjStatus,
      EditProj, 
      // setEditProj
     } = ProjContexts();
    // console.log(ProjStatus)

  return (

    <>
    {/* {console.log(EditProj)} */}
    <Snackbar open={ EditProj===false && ProjStatus===200}
     onClose={() => setProjStatus(-1)} autoHideDuration={3000}
     >
    <Alert severity="success" sx={{ width: '100%' }}>
    Project created
    </Alert>
    </Snackbar>

    <Snackbar open={EditProj===true && ProjStatus===200 }
     onClose={() => setProjStatus(-1)} autoHideDuration={3000}
     >
    <Alert severity="success" sx={{ width: '100%' }}>
        Project updated
    </Alert>
    </Snackbar>

    <Snackbar open={ProjStatus>=500} 
    onClose={() => setProjStatus(-1)} autoHideDuration={3000}
    >
    <Alert severity="error" sx={{ width: '100%' }}>
        Something went wrong
    </Alert>
    </Snackbar>
    
    {/* <Snackbar open={ProjStatus===501} 
    onClose={() => setProjStatus(-1)} autoHideDuration={3000}
    >
    <Alert severity="warning" sx={{ width: '100%' }}>
        Project created. User data was not updated.
    </Alert>
    </Snackbar> */}

    </>
  )
}

export default ProjStatus
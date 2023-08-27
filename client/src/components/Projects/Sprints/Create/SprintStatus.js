import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { SprintContexts } from '../../../../contexts/SprintContexts';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

function SprintStatus() {

    const { 
      SprintStatus, setSprintStatus
     } = SprintContexts();
    // console.log(ProjStatus)

  return (

    <>

    <Snackbar open={ SprintStatus===200 }
     onClose={() => setSprintStatus(-1)} autoHideDuration={3000}
     >
    <Alert severity="success" sx={{ width: '100%' }}>
    Sprint created
    </Alert>
    </Snackbar>

    <Snackbar open={ SprintStatus>=500 } 
    onClose={() => setSprintStatus(-1)} autoHideDuration={3000}
    >
    <Alert severity="error" sx={{ width: '100%' }}>
        Something went wrong
    </Alert>
    </Snackbar>

    </>
  )
}

export default SprintStatus
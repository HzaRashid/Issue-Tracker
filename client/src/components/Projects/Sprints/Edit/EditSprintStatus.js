import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { SprintContexts } from '../../../../contexts/SprintContexts';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

function Status() {

    const { 
      EditSprintStatus, setEditSprintStatus
     } = SprintContexts();
    // console.log(ProjStatus)

  return (

    <>

    <Snackbar open={ EditSprintStatus===200}
     onClose={() => setEditSprintStatus(-1)} autoHideDuration={3000}
     >
    <Alert severity="success" sx={{ width: '100%' }}>
    Sprint updated
    </Alert>
    </Snackbar>

    <Snackbar open={EditSprintStatus>=500} 
    onClose={() => setEditSprintStatus(-1)} autoHideDuration={3000}
    >
    <Alert severity="error" sx={{ width: '100%' }}>
        Something went wrong
    </Alert>
    </Snackbar>

    </>
  )
}

export default Status
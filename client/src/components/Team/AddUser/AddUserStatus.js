import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { TeamContexts } from '../../../contexts/TeamContexts';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

function AddUserStatus() {
    

    const { NewUserStatus, setNewUserStatus } = TeamContexts();

  return (
    <>
    <Snackbar open={NewUserStatus===200}
    onClose={() => setNewUserStatus(-1)} autoHideDuration={3000}
    >
   <Alert severity="success" sx={{ width: '100%' }}>
       User created
   </Alert>
   </Snackbar>

   <Snackbar open={NewUserStatus===500} 
   onClose={() => setNewUserStatus(-1)} autoHideDuration={3000}
   >
   <Alert severity="error" sx={{ width: '100%' }}>
       User could not be created
   </Alert>
   </Snackbar>
   
   <Snackbar open={NewUserStatus > 500} 
   onClose={() => setNewUserStatus(-1)} autoHideDuration={3000}
   >
   <Alert severity="warning" sx={{ width: '100%' }}>
       User created. Failed to sync data.
   </Alert>
   </Snackbar>
   </>
  )
}

export default AddUserStatus
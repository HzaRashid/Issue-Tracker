import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { TeamContexts } from '../../../contexts/TeamContexts';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

function EditThisUserStatus() {
    

    const { EditThisUserStatus, setEditThisUserStatus } = TeamContexts();

  return (
    <>
    <Snackbar open={EditThisUserStatus===200}
    onClose={() => setEditThisUserStatus(-1)} autoHideDuration={3000}
    >
   <Alert severity="success" sx={{ width: '100%' }}>
       User edited
   </Alert>
   </Snackbar>

   <Snackbar open={EditThisUserStatus >= 500} 
   onClose={() => setEditThisUserStatus(-1)} autoHideDuration={3000}
   >
   <Alert severity="error" sx={{ width: '100%' }}>
       User could not be Edited
   </Alert>
   </Snackbar>
   
   {/* <Snackbar open={EditUserStatus > 500} 
   onClose={() => setEditUserStatus(-1)} autoHideDuration={3000}
   >
   <Alert severity="warning" sx={{ width: '100%' }}>
        User could not be Edited
   </Alert>
   </Snackbar> */}
   </>
  )
}

export default EditThisUserStatus
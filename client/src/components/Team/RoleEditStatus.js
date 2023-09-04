import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function RoleEditStatus(
  {
    Response, 
    NewRole, 
    setResponse,
    ClickConfirm,
    setClickConfirm,
  }) 
  {
  return (
  <>
  <Snackbar 
  open={ClickConfirm && Response.status===200} 
  autoHideDuration={2250}
  onClose={
    () => {
    setClickConfirm(false);
    setResponse({});
    window.location.reload(false);
    }}
  >
  <Alert severity="success" sx={{ width: '100%' }}>
      Role changed to { `'${NewRole}'` }
  </Alert>
  </Snackbar> 


  
  
  <Snackbar 
  open={ClickConfirm && Response.status!==200} 
  autoHideDuration={2250}
  onClose={
    () => {
    setClickConfirm(false);
    setResponse({});
    window.location.reload(false);
    }}
  >
  <Alert severity="error" sx={{ width: '100%' }}>
      Role could not be changed
  </Alert>
  </Snackbar> 

  </>

  )
}

export default RoleEditStatus
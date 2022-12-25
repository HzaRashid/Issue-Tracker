import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { IssueContexts } from '../../../contexts/IssueContexts';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

function IssueStatus() {
    
    // 200: success
    // 500: issue post request failed
    // 501: failed to sync with sprint
    // 502: failed to sync with project
    // 503: failed to sync with user

    const { IssueStatus, setIssueStatus } = IssueContexts();
    // console.log(IssueStatus)

  return (
    <>
    <Snackbar open={IssueStatus===200}
    onClose={() => setIssueStatus(-1)} autoHideDuration={3000}
    >
   <Alert severity="success" sx={{ width: '100%' }}>
       Issue created
   </Alert>
   </Snackbar>

   <Snackbar open={IssueStatus===500} 
   onClose={() => setIssueStatus(-1)} autoHideDuration={3000}
   >
   <Alert severity="error" sx={{ width: '100%' }}>
       Issue could not be created
   </Alert>
   </Snackbar>
   
   <Snackbar open={IssueStatus > 500} 
   onClose={() => setIssueStatus(-1)} autoHideDuration={3000}
   >
   <Alert severity="warning" sx={{ width: '100%' }}>
       Issue created. Failed to sync data.
   </Alert>
   </Snackbar>
   </>
  )
}

export default IssueStatus
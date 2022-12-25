import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { TeamContexts } from '../../contexts/TeamContexts';
// eslint-disable-next-line
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// eslint-disable-next-line
import DialogTitle from '@mui/material/DialogTitle';
// eslint-disable-next-line
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// eslint-disable-next-line
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
// eslint-disable-next-line
import axios from 'axios'
// eslint-disable-next-line
const data = require('../../pages/routes.json');

// eslint-disable-next-line
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TeamDeleteUser({User, MenuOpen}) {
    const [Password, setPassword] = useState(''); 
    const [ShowText, setShowText] = useState(false); 
    // eslint-disable-next-line
    const [FalsePwd, setFalsePwd] = useState(false);
    // eslint-disable-next-line
    const [ClickDelete, setClickDelete] = useState(false);
    // eslint-disable-next-line
    const [DeleteResp, setDeleteResp] = useState(false);

    // eslint-disable-next-line
    const { DeleteUser, setDeleteUser } = TeamContexts();

    // eslint-disable-next-line
    const [ConfirmDelete, setConfirmDelete] = useState(false);
    const getPwd = event => setPassword(event.target.value);

    const UserFullName = User.firstName + ' ' + User.lastName;
    // eslint-disable-next-line
    const DeleteDialogueI = `You are about to delete 
    ${UserFullName} from the team.`
    // eslint-disable-next-line
    const DeleteDialogueII = 'This action cannot be undone.'
  return (
    <>

    <DialogContent>
    <TextField
      autoFocus
      margin="dense"
      id="delete"
      label={`Enter ${User.firstName + ' ' + User.lastName}'s password.. `}
      type={ShowText ?  "text" : "password"}
      fullWidth
      variant="standard"
      value={Password}
      onChange={ getPwd }
    />

  </DialogContent>

    <Grid container justifyContent="center">
    <Button 
    sx={{width:'1rem', alignItems:'center', textTransform: 'none'}}
    onClick={
    () => setShowText(!ShowText)}
     >
    {ShowText ? <VisibilityIcon/> : <VisibilityOffIcon/>}
    </Button>
    </Grid>
    
      <DialogActions>
      <Button onClick={() => setDeleteUser(false)}>Cancel</Button>
      {(Password) &&
      <Button 
      >
      Confirm
      </Button>
      }
    </DialogActions>

    {/* <Dialog
      open={ConfirmDelete}
      fullWidth maxWidth='sm'
      PaperProps={{
        style: {
          backgroundColor: '#f4f4f4',
        },
      }}
    >
    <DialogTitle 
      sx={{fontSize:"1em", textAlign:'center', 
      color:'181818', fontWeight:'light'
      }}
    >
      <Typography variant='h6' mt={2}>
      {DeleteDialogueI} 
      </Typography>

      <Typography variant='h6' mt={2}>
      {DeleteDialogueII} 
      </Typography>
      </DialogTitle>
      <DialogActions>
        
      <Button onClick={() => setConfirmDelete(false)}>
      NO
      </Button>
      <Button 
      onClick={ 
        async () => {

        const response = await axios.delete(
          data.Users + `/${User._id}`, 
          {
            data: {
            _id: User._id,
            }
          }
        )
          
          setDeleteResp(response);
          setClickDelete(true);
        
      }}
      >
        Yes, Confirm
        </Button>

    </DialogActions> */}

    {/* <Snackbar 
    open={DeleteResp.status===200} 
    autoHideDuration={2250}
    onClose={
    () => {
    setClickDelete(false);
    setDeleteResp({});
    window.location.reload(false);
    }}
    >
    <Alert severity="success" sx={{ width: '100%' }}>
    User Deleted
    </Alert>
    </Snackbar> 

    </Dialog>    */}

    </>
  )
}

export default TeamDeleteUser
import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import RoleEditStatus from './RoleEditStatus';
import axios from 'axios';
const data = require('../../pages/routes.json');


function TeamEditRole({MenuOpen, User, Users}) {
  
  const [ConfirmMenuActive, setConfirmMenuActive] = useState(false);
  const [NewRole, setNewRole] = useState('');
  const [Response, setResponse] = useState({});
  const [ClickConfirm, setClickConfirm] = useState(false)

  // const [RoleDone, setRoleDone] = useState(false)
  const getNewRole = event => setNewRole(event.target.value);

  // eslint-disable-next-line no-useless-concat
  const roleDialogue = `Change 
  ${User.firstName + ' ' +  User.lastName}'s
  role \n from '${User.role}' to '${NewRole}' ?
  `

  // display up-to-date role after refresh
  const user = Users.filter(
    (row) => row._id === User._id
  )[0];
  const roleLabel=`Edit role from '${user.role}' to:`;

  return ( 
      <>

    <DialogContent>
      <TextField
        autoFocus
        margin="dense"
        id="role"
        label={roleLabel}
        type="email"
        fullWidth
        variant="standard"
        value={NewRole}
        onChange={getNewRole}
      />
      {console.log(NewRole)}
    </DialogContent>

    <DialogActions>
      <Button onClick={() => MenuOpen(false)}
      >
      Cancel
      </Button>
      
      {(NewRole) &&
      <Button onClick={
        () => setConfirmMenuActive(true)
      }>
        Continue
      </Button>
      }
    </DialogActions>

    
    <Dialog
      open={ConfirmMenuActive}
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
      {roleDialogue}
      </Typography>
      </DialogTitle>
      

      <DialogActions>
      <Button onClick={() => setConfirmMenuActive(false)}>NO</Button>
      <Button 
      onClick={ 
        async () => {

        const response = await axios.put(
          data.UserRole + `/${User._id}`,
          {
            _id: User._id,
            role: NewRole
          })
          
          setResponse(response);
          
          setClickConfirm(true);
          

      }}
      >
        Yes, Confirm
        </Button>
        {console.log(Response)}

    </DialogActions>

    <RoleEditStatus
    Response={Response} 
    setResponse={setResponse}
    ClickConfirm={ClickConfirm}
    setClickConfirm={setClickConfirm}
    NewRole={NewRole}
    />

    </Dialog>    


  </>
  )
}

export default TeamEditRole
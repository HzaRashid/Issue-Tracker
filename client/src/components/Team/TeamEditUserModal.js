import React, { useState } from 'react'
import { TeamContexts } from '../../contexts/TeamContexts'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { Tooltip } from '@mui/material';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { AiOutlineUserDelete } from 'react-icons/ai'
import TeamEditRole from './TeamEditRole';
import TeamDeleteUser from './TeamDeleteUser';


// Menu button styles
const ActiveStyle = {
  fontSize:"1.6em", 
  padding:'0.1em', 
  textTransform:'none',
  textAlign:'center', 
  // background: '#2929291a', 
  boxShadow: 'none',
  fontWeight:'Light',
  color:'#5B7C90'
}

const IdleStyle = {
  fontSize:"1.6em", 
  padding:'0.1em', 
  textTransform:'none',
  textAlign:'center', 
  boxShadow: 'none',
  fontWeight:'Light',
  color:'#5B7C90',
}

// for displaying menu buttons
const bothFalse = (a, b) => (a===false && a===b)
const threeFalse = (a, b, c) => (a===false && a===b && b===c)


function TeamEditUserModal({Users, SelectedUsers, setSelectedUsers}) {
    const { 
      EditUser, setEditUser,
      DeleteUser, setDeleteUser,
      // eslint-disable-next-line
      ModalOpen, setModalClosed
    } = TeamContexts()

    // setModalClosed(false);
    const [EditRole, setEditRole] = useState(false);
    const [Projects, setProjects] = useState(false);

    const User = SelectedUsers[0];


    const closeModal = () => {
      setEditUser(false); 
      setDeleteUser(false);
      setProjects(false)
      setModalClosed(true)
      setSelectedUsers([]);
    }

  return (
    <>
    <div>

        <Dialog 
        open={EditUser} 
        onClose={closeModal} 
        fullWidth maxWidth='sm'
        PaperProps={{
          style: {
            backgroundColor: '#EDEDED',
            // boxShadow:'none',
          },
        }}
        // BackdropProps={{invisible:'true'}}
        // sx={{
        //   backdropFilter:'blur(5px)', 
        //   // backgroundColor:'#00000040'
        //   }}
        >
        <DialogTitle 
        sx={{
          fontSize:"1.8em", 
          textAlign:'center',
          color:'181818', 
          fontWeight:'light',
          marginBottom:'0.35em'
      }}
        >
        {
        User.firstName + ' ' +  User.lastName
        }
        </DialogTitle>
        <Stack 
        direction="row" 
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2} 
        justifyContent='center'
        
        >

        { 
        bothFalse(EditRole, Projects) &&
        <Tooltip title='Delete'>
        <Button 
        sx={IdleStyle} 
        // maxWidth='5'
        onClick={() => setDeleteUser(!DeleteUser)}
        >
          <AiOutlineUserDelete color='#B97575' size={32}/>
          </Button>
          </Tooltip>
        }

        {
        bothFalse(Projects, DeleteUser) &&
        <Tooltip 
        title="Edit Role" 
        >
        <Button 
        onClick={() => {
          setEditRole(!EditRole);
        }} 
        sx={(EditRole) ? ActiveStyle : IdleStyle}
        color="role"
        >
        Role
        </Button>
        </Tooltip>
        }


        {
        bothFalse(EditRole, DeleteUser) &&
        <Tooltip 
        title="Edit Projects" 
        >
        <Button 
        onClick={() => setProjects(true)} 
        sx={(Projects) ? ActiveStyle : IdleStyle}
        color='projects'
        >
        Projects
        </Button>
        </Tooltip>
        }
        </Stack>

       { EditRole && 
       <TeamEditRole 
       MenuOpen={setEditRole} 
       User={User} 
       Users={Users}
       /> 
       }
       
       { DeleteUser && 
       <TeamDeleteUser 
       User={User} 
       Users={Users}
       /> 
       }
      
      { threeFalse(EditRole, Projects, DeleteUser) &&
        <DialogActions>
        <button 
        onClick={closeModal} 
        className='p-2 hover:bg-[#0000000d] '
        >
          <CloseIcon sx={{color:'black'}}/></button>
      </DialogActions>
      }
      
      </Dialog>


    </div>

    </>

  )
}

export default TeamEditUserModal
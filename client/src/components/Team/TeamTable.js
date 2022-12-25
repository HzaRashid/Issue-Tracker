import { TeamContexts } from '../../contexts/TeamContexts'
import { 
  DataGrid, 
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
  GridActionsCellItem
 } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react'
import { AiOutlineUserAdd } from "react-icons/ai";
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { CustomTooltip } from '../CustomTooltip';
import TeamEditUserModal from './TeamEditUserModal';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';


function CustomToolbar() {
  return (
    <GridToolbarContainer sx={{m: 1.25}}>
      <GridToolbarQuickFilter />
      <GridToolbarDensitySelector 
      sx={{
        marginLeft: 3, 
        marginTop:1.25, 
        textTransform:'none',
        color:'#7895B3',
        fontSize:'1em',
        fontWeight: 300
    }}
      />
    </GridToolbarContainer>
  );
}


const theme = createTheme({
  typography: {
   "fontFamily": `"Open Sans", sans-serif`,
   "fontSize": 15.5,
   "fontWeightLight": 200,
   "fontWeightRegular": 300,
   "fontWeightMedium": 400
  },
  palette: {
    primary: {
      main: '#7895B3',
        },
      role: {
        main: '#00000020',
        contrastText: '#000000',
      },
      projects: {
          main: '#00000020',
          contrastText: '#000000',
        },
    },

  components: {
    MuiDataGrid: {
        styleOverrides: {
            root: {
                border: 'none'
            }
        }
    }
}

});



function TeamTable() {

    const {
        Users,
        AddUser, setAddUser,
        // DeleteUser, setDeleteUser,
        EditUser, setEditUser,
        ModalClosed, setModalClosed
        } = TeamContexts()


    const [SelectedUsers, setSelectedUsers] = useState([]);
    // const [Users, setUsers] = useState([]);
    const [pageSize, setPageSize] = useState(10);


    useEffect(
      () => {
        const BoolStr = localStorage.getItem('EditUserBool');

        if (BoolStr==='true')
          setEditUser(true)
        
        setSelectedUsers(
          JSON.parse(localStorage.getItem('UserList'))
          )
      }
      // eslint-disable-next-line
      ,[])
      
    useEffect(
      () => {
        localStorage.setItem('EditUserBool', EditUser);
        localStorage.setItem('UserList', JSON.stringify(SelectedUsers))
      }
    )



      const columns = [ 
        {
        headerName:'Edit',
        type: 'actions',
        width: 60,
        field:'actions',

        getActions: (params) => [
          <GridActionsCellItem
            icon={<EditIcon sx={{color:'#8096A2', fontSize:'1.4em'}}/>}
            label="Edit"
            onClick={
              () => {
                setSelectedUsers([params.row]); 
                setEditUser(!EditUser)
                setModalClosed(false);
              }
            }
          />,
        ],
      }, 

        { 
          field: 'firstName', 
          headerName: 'First Name', 
          flex: 0.5,
        },
        { 
          field: 'lastName', 
          headerName: 'Last Name', 
          flex: 0.5,
          
        },
        {
          field: 'email', 
          headerName: 'Email', 
          flex: 0.4,
          renderCell: (params) => (
          <CustomTooltip title='Send Email'>
          <a 
          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${params.value}`} 
          target="_blank" 
          rel="noopener noreferrer"
          >
          {params.value}
          </a>
          </CustomTooltip>
      
          )
        },
      
        { 
          field: 'role',  
          headerName: 'Role', 
          flex: 0.7,
        },

      ]

    return (
        <>
        <ThemeProvider theme={theme}>

        <div 
        className='relative' 
        style={{
            height: 500, 
            width: '100%', 
            top: '4rem',
            flexGrow: 1 
            }}
        >
            <DataGrid
            rows={Users}
            columns={columns}
            checkboxSelection
            components={{Toolbar: CustomToolbar}}
            pageSize={pageSize}
            onPageSizeChange={
            (newPageSize) => setPageSize(newPageSize)
            }
            rowsPerPageOptions={[5, 10, 20]}
            pagination

            getRowId={(row) => row._id}
            sx={{ 
            mx: 4, 
            bgcolor: '#f0f0f0', 
            '& .MuiDataGrid-cell:hover': {
            color: '#588B63',
            },
   
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 'lighter'
            },
            }}
            GridLines="None"

            onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            setSelectedUsers(Users.filter(
                (row) => selectedIDs.has(row._id)
            ));
            console.log(SelectedUsers);
            }}
        />
        
        <div className='absolute right-8'>
        <CustomTooltip title='Add User'>
        <button 
        onClick={() => setAddUser(!AddUser)} 
        className='mt-3 p-1 ml-8
        hover:bg-[#e7e7e7]'
        >
        <AiOutlineUserAdd 
        style={{color: '#353535', fontSize: 40}}
        />
        </button>
        </CustomTooltip>
        </div>


        <div className={AddUser ? 
        'visibility: visible' :
        'visibility: hidden'
        }
        >
            echo
        </div>

        <div 
        className={(SelectedUsers && SelectedUsers.length === 1 && ModalClosed===true) ? 
        'visibility: visible' :
        'visibility: hidden'
        }
        >
            <CustomTooltip title="Edit User">
            <button 
            className='mt-3 p-1 ml-8 
            hover:bg-[#e7e7e7]'
            onClick={() => setEditUser(!EditUser)}
            >
            <ModeEditOutlineIcon
            style={{color: '#90B29E', fontSize: 40}}
            />
            </button>
            </CustomTooltip>
        </div>

        <div className={(SelectedUsers?.length > 1) ? 
        'visibility: visible' :
        'visibility: hidden'
        }
        >
            <CustomTooltip title="Assign Project">
            <button 
            className='mt-3 p-1 ml-8 
            hover:bg-[#e7e7e7]'
            onClick={() => setEditUser(true)}
            >
            <ListAltIcon
            style={{color: '#90B29E', fontSize: 40}}
            />
            </button>
            </CustomTooltip>
        </div>

        </div>

        { EditUser && 
        <TeamEditUserModal 
        Users={Users} 
        SelectedUsers={SelectedUsers}
        setSelectedUsers={setSelectedUsers}
        /> 
        }

        </ThemeProvider>
        </>

    );
}

export default TeamTable
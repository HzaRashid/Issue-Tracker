import { TeamContexts } from '../../contexts/TeamContexts'
import { 
  DataGrid, 
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
  GridActionsCellItem,
  useGridApiRef,
 } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react'
import { AiOutlineUserAdd } from "react-icons/ai";

// import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
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
        AddUserModal, setAddUserModal,
        // DeleteUser, setDeleteUser,
        EditUser, setEditUser,
        ModalClosed, setModalClosed,
        AssignProjModal, setAssignProjModal,
        SelectedGridUsers, setSelectedGridUsers,
        tableRef, setTableRef, 
        setEditUserModal,
        setSelectedUser
        } = TeamContexts()

    
    // console.log(SelectedUsers)




    // const [Users, setUsers] = useState([]);
    const [pageSize, setPageSize] = useState(10);



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
                setSelectedUser(params.row) 
                setEditUserModal(true);
                // setEditUser(!EditUser)
                // setModalClosed(false);
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



  const ref = useGridApiRef();
  console.log(tableRef)

  useEffect(() => setTableRef(ref), [])
  useEffect(() => setSelectedGridUsers([]), [])

// useEffect(() => {

//     if (tableRef.current !== null) {
//       console.log(/ref not null/)
//     const visibleRows = gridPaginatedVisibleSortedGridRowIdsSelector(tableRef);
//     if (visibleRows.length === 0) {
//       return;
//     }


//     for (let i = 0; i < Users?.length - 1; i++) {
//       const isSelectedUser = SelectedUsers?.filter(u => {
//         return u._id === Users[i]?._id
//       })?.length

//       if ( isSelectedUser  ) {
//         // console.log(tableRef.current.isRowSelected(visibleRows[i]))
//         console.log(isSelectedUser)
//         tableRef.current.selectRow(
//           visibleRows[i],
//           // !tableRef.current.isRowSelected(visibleRows[i])
//         );
//       }
//     }}
//     else console.log(/ref null/)

//   }, [SelectedUsers?.length])

  if (tableRef.current === null) return


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
            apiRef={tableRef}
            rows={Users}
            columns={columns}
            checkboxSelection
            slots={{toolbar: CustomToolbar}}
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

            onRowSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            setSelectedGridUsers(Users.filter(
                (row) => selectedIDs.has(row._id)
            ));
            console.log(SelectedGridUsers);
            }}
        />
        
        <div className='absolute right-8'>
        <CustomTooltip title='Add User'>
        <button 
        onClick={() => setAddUserModal(true)} 
        className='mt-3 p-1 ml-8
        hover:bg-[#e7e7e7]'
        >
        <AiOutlineUserAdd 
        style={{color: '#353535', fontSize: 40}}
        />
        </button>
        </CustomTooltip>
        </div>


        {/* <div 
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
        </div> */}

        <div className={(SelectedGridUsers?.length >= 1) ? 
        'visibility: visible' :
        'visibility: hidden'
        }
        >
            <CustomTooltip title="Assign Project">
            <button 
            className='mt-3 p-1 ml-8 
            hover:bg-[#e7e7e7]'
            onClick={() => setAssignProjModal(true)}
            >
            <ListAltIcon
            style={{color: '#90B29E', fontSize: 40}}
            />
            </button>
            </CustomTooltip>
        </div>

        </div>

        {/* { EditUser && 
        <TeamEditUserModal 
        Users={Users} 
        SelectedUsers={SelectedGridUsers}
        setSelectedUsers={setSelectedGridUsers}
        /> 
        } */}

        </ThemeProvider>
        </>

    );
}

export default TeamTable
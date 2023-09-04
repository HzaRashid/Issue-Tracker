import React, { useEffect, useMemo, useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid, GridActionsCellItem, GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { TeamContexts } from '../../../contexts/TeamContexts';

import { ProjContexts } from '../../../contexts/ProjectContexts';
import { CustomTooltip } from '../../CustomTooltip';
function List() {
    const { Users, setSelectedUser, setEditUserModal } = TeamContexts();
    const { SelectedProj } = ProjContexts();
    // console.log(Projects)

    const [ ProjTeam, setProjTeam ] = useState([]);
    // cons
    useEffect(() => {
        const users = Users.slice().filter(u => {
            return u?.projects.includes(SelectedProj?._id)});
        setProjTeam(users)
        
    }, [Users, SelectedProj])
    // console.log(SelectedProj)
    // allow user to search issues by assignee
    const rows = useMemo(() => {
     
    return ProjTeam?.map(
      ( u, key ) => {
        u.id = key
        return u
    }
    )
}, [ProjTeam])

    
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
              }
            }
          />,
        ],
      }, 

        { 
          field: 'firstName', 
          headerName: 'First Name', 
          flex: 0.4,
        },
        { 
          field: 'lastName', 
          headerName: 'Last Name', 
          flex: 0.4,
          
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
          flex: 0.5,
        },

        

      ]



  return (
    <>
    <ThemeProvider theme={theme}
    >

    <div 
    className='relative font-bold ' 
    style={{
        height: 390, 
        width: '100%', 
        top: '3rem',
        flexGrow: 0.5 ,
        text: 'bold',  
        }}
    >
    <DataGrid
    // getRowId={(row) => row._id}
    rows={rows}
    columns={columns}
    slots={{ toolbar: CustomToolbar }}
    
    slotProps={{
      toolbar: {
        users: ProjTeam,
        project: SelectedProj
      },
    }}

    hideFooterPagination
    disableDensitySelector
    disableSelectionOnClick

    // getRowId={(row) => row?._id}
    sx={{ 
        overflow:'scroll',
        borderBottom: 'none',
        zIndex:'0',
    mx: 4, 
    bgcolor: 'transparent', 
    '& .MuiDataGrid-cell:hover': {
    color: '#588B63',
    },
    '& .MuiDataGrid-cell:focus': {
      color: '#588B63',
      outline: 'none',
      },
    // '& .MuiDataGrid-cell': {
    //     fontWeight: 'normal',
    // },
    '& .MuiDataGrid-columnHeaderTitle': {
      color: '#909090',
      fontWeight: 'light'
    //   fontFamily:`"Open Sans", sans-serif`
    },
    '& .MuiDataGrid-columnSeparator': {
        visibility: 'hidden'
    },
    '& .MuiDataGrid-cell': {
        overflow: 'scroll',
        border: 'none',
        outline: 'none',
        fontWeight: '400'
    },
    
    '& .MuiMenuItem-root': {
        backgroundColor: '#505050'
    },
    '& .MuiFormControl-root': {
        fontSize: '1.5em'
    },
    '& .css-o8va6p-MuiFormControl-root-MuiTextField-root-MuiDataGrid-toolbarQuickFilter .MuiSvgIcon-root': {
        color: '#808080'
    },

    '& .MuiDataGrid-footerContainer': {
      color: 'transparent',
      background: 'transparent',
      border: 'none'
    }

    }}
    GridLines="None"
    />
    
    </div>
    </ThemeProvider>
    </>
  )


}


function CustomToolbar( props ) {
    // console.log(props)
    const issueCount = props?.users?.length
    // console.log(props.issueData)  // eslint-disable-next-line
    return (
    <div className='flex items-center font-lato'> 
      <GridToolbarContainer sx={{m: 1.25}}>

        <div className='flex items-center'> 
        <div className='font-bold text-[1.75em] whitespace-pre'>
            {/* { 'Team' + ' (' + props?.project?.title + ')'} */}
            {`Team (${props?.project?.title})`}
            <div className='text-[0.5em]'>
                {issueCount + ' total'}
            </div>
        </div>
        <GridToolbarQuickFilter 
                sx={{
                    marginLeft: 4, 
                    marginTop: -2, 
                    textTransform:'none',
                    color: '#7895B3',
                    
                  //   fontWeight: 400
                }}
        />


        </div>


      </GridToolbarContainer>
      </div>
    );
  };

  const theme = createTheme({
    typography: {
     "fontFamily": `"Lato", sans-serif`,
     "fontSize": 14.5,
     "fontWeightLight": 400,
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
  
  


export default List
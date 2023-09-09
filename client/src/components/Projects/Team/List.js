import React, { useMemo } from 'react'
import { ThemeProvider, createTheme } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid, GridActionsCellItem, GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { TeamContexts } from '../../../contexts/TeamContexts';
import { ProjContexts } from '../../../contexts/ProjectContexts';
import { CustomTooltip } from '../../CustomTooltip';
import { DatagridStyle } from '../../Home/Issues/DatagridStyle';
import { theme } from '../../Home/Issues/theme';
function List() {
    const { Users, setSelectedUser, setEditUserModal } = TeamContexts();
    const { SelectedProj } = ProjContexts();

    const rows = useMemo(() => {
      return Users?.filter(u => u?.projects.includes(SelectedProj?._id))
      ?.map((u, key) => {
           u.id = key
           return u
          })
        }, [Users, SelectedProj])

    
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


  const Theme = createTheme(theme)
  return (
    <>
    <ThemeProvider theme={Theme}
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
        users: rows,
        project: SelectedProj
      },
    }}

    hideFooterPagination
    disableDensitySelector
    disableSelectionOnClick

    // getRowId={(row) => row?._id}
    sx={DatagridStyle}
    GridLines="None"
    />
    
    </div>
    </ThemeProvider>
    </>
  )


}


function CustomToolbar( props ) {
    // console.log(props)
    const numUsers = props?.users?.length
    // console.log(props.issueData)  // eslint-disable-next-line
    return (
    <div className='flex items-center font-lato'> 
      <GridToolbarContainer sx={{m: 1.25}}>

        <div className='flex items-center'> 
        <div className='font-bold text-[1.75em] whitespace-pre'>
            {/* { 'Team' + ' (' + props?.project?.title + ')'} */}
            {`Team (${props?.project?.title})`}
            <div className='text-[0.5em]'>
                {numUsers + ' total'}
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
  
  


export default List
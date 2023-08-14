import React, { useEffect, useState } from 'react'
import { Avatar, ThemeProvider, createTheme } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid, GridActionsCellItem, GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { IssueContexts } from '../../contexts/IssueContexts'; 
import axios from 'axios';
import { TeamContexts } from '../../contexts/TeamContexts'; 
import TitleCase from '../utils/TitleCase'; 
import { AiFillCheckSquare, AiFillTool } from 'react-icons/ai';
import { MdError } from 'react-icons/md';
import stringAvatar from '../utils/UserAvatar/StringAvatar'; 
import { ProjContexts } from '../../contexts/ProjectContexts';
import { AuthContexts } from '../../App/Auth';
const data = require('../../pages/routes.json')



function AssigneeList() {
    const { setSelectedIssue, setEditIssueModal } = IssueContexts();
    const { Users } = TeamContexts();
    const { Projects } = ProjContexts();
    const { user } = AuthContexts();
    const [ Issues, setIssues ] = useState([])

    useEffect(() => {
            axios.get(
                data.Issues
            )
            .then(res => { 
              setIssues(
                res.data.filter(
                  i => { return i?.assignedTo === user.user}
                )
                ) 
            })
            .catch(err => console.log(err))
    // eslint-disable-next-line
    }, []);

    const columns = [ 
        {
        headerName:'Edit',
        type: 'actions',
        width: 60,
        field:'actions',

        getActions: (params) => [
          <GridActionsCellItem
            icon={<EditIcon sx={{color:'#8096A2', fontSize:'1.2em'}}/>}
            label="Edit"
            onClick={
              () => {
                console.log(params)
                setSelectedIssue(params.row); 
                setEditIssueModal(true)
              }
            }
          />,
        ],
      }, 

        {
            field: 'type', 
            headerName: 'Type', 
            flex: 0.15,
            width: 60,
            renderCell: (params) => {
                return (
                    <> 
                    {params.value.toLowerCase() === 'task' &&
                        <div className='flex items-center'>
                        <AiFillCheckSquare 
                        color='#6E94B9' 
                        fontSize={'1.25em'}
                        className='drop-shadow-sm mr-2'
                        />
                        Task
                        </div>
                    }
                    {params.value.toLowerCase() === 'bug' &&
                    <div className='flex items-center space-x-2'>
                    <MdError
                    color='#B95E6E' 
                    fontSize={'1.25em'}
                    className='drop-shadow-sm mr-2'
                    />
                    Bug
                    </div>
                    }
                    {params.value.toLowerCase() === 'feature' &&
                    <div className='flex items-center space-x-2'>
                    <AiFillTool
                    color='#7EA67C' 
                    fontSize={'1.25em'}
                    className='drop-shadow-sm mr-2'
                    />
                    Feature
                    </div>
                    }
                    </>
                )
            }
        },

        {
            field: 'summary', 
            headerName: 'Summary', 
            flex: 0.3,
            width: 50,
            renderCell: (params) => TitleCase(params.value)
        },

        {
            field: 'stage', 
            headerName: 'Stage', 
            flex: 0.3,
            width: 50,
            renderCell: (params) => {
                return (
                    <>
                    {params.value.toLowerCase() === 'backlog' ?
                    <> 
                    <div className='p-1 rounded-md text-[#505050] bg-[#00000012]'>
                        Backlog
                    </div> 
                    </> :
                    <> 
                    <div className='p-1 rounded-md text-[#1b3447] bg-[#d7dfe2]'>
                        {TitleCase(params.value)}
                    </div>
                    </>
                    }

                    </>
                )
                

            }
        },

        {
          field: 'project', 
          headerName: 'Project', 
          flex: 0.3,
          width: 50,
          renderCell: (params) => {
            return (
              <>
              <div className='p-1 rounded-md bg-[#dddce8] text-[#454754]'>
                {Projects.filter(p => p._id === params.value)[0]?.title}
              </div>
              </>
            )
          }
      },

        { 
            field: 'assignedTo', 
            headerName: 'Assignee', 
            flex: 0.5,
            renderCell: (params) => {
                const user = getAssignee(params.value)
                const name = user?.firstName + ' ' + user?.lastName
                return (
                    <div className='flex items-center'>
                    <Avatar 
                  className=' antialiased mr-3'
                  {...stringAvatar(name, 22, 22, '0.75em')} 
                  
                  />
                        {name}
                    </div>
                )
            }
        },

      ]


  function getAssignee (assigneeID) {
    const user = Users.filter(u => {
      return u._id === assigneeID
    })[0];
    return user
  }

  const [pageSize, setPageSize] = useState(10);

  return (
    <>
    <ThemeProvider theme={theme}>
    <div 
    className='relative font-bold' 
    style={{
        height: 'auto', 
        maxHeight: 350,
        width: '100%', 
        top: '3rem',
        flexGrow: 0.5 ,
        text: 'bold',  
        }}
    >
    <DataGrid
    rows={Issues}
    columns={columns}
    components={{Toolbar: CustomToolbar}}
    componentsProps={{ toolbar: { issues: Issues } }}
    pageSize={pageSize}
    onPageSizeChange={
    (newPageSize) => setPageSize(newPageSize)
    }

    hideFooterPagination
    disableDensitySelector
    disableSelectionOnClick

    getRowId={(row) => row._id}

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
    '& .MuiDataGrid-columnHeaderTitle': {
      color: '#909090',
      fontWeight: 'light'
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

    const issueCount = props?.issues?.length

    return (
    <div className='flex items-center font-lato'> 
    <GridToolbarContainer sx={{m: 1.25}}>
      <div className='flex items-center'> 
      <div className='font-bold text-[1.75em]'>
          Assigned to me
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
  
  


export default AssigneeList
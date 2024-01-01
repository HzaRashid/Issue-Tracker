import React, { useEffect, useMemo, useState } from 'react'
import { Avatar, ThemeProvider, createTheme } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { IssueContexts } from '../../contexts/IssueContexts'; 
import axios from 'axios';
import { TeamContexts } from '../../contexts/TeamContexts'; 
import TitleCase from '../utils/TitleCase'; 
import { AiFillCheckSquare, AiFillTool } from 'react-icons/ai';
import { MdError } from 'react-icons/md';
import stringAvatar from '../utils/UserAvatar/StringAvatar'; 
import { ProjContexts } from '../../contexts/ProjectContexts';
import { AuthContexts } from '../../App/Auth';
import { DatagridStyle } from '../Home/Issues/DatagridStyle';
import { theme } from '../Home/Issues/theme';
import CustomToolbar from '../Home/Issues/CustomToolbar';



function PostedList() {
  const { 
    setSelectedIssue, setEditIssueModal,
    Issues,
    PstdIssues, setPstdIssues
    } = IssueContexts();
  const { Users } = TeamContexts();
  const { Projects } = ProjContexts();
  const { user } = AuthContexts();

  useEffect(() => {
    const getMyIsssues = () => {
      if (!PstdIssues?.length) {
        if (!Issues?.length) {
          axios.get(
            process.env.REACT_APP_API_Issues,
            { withCredentials: true })
          .then(res => { 
            setPstdIssues(
              res.data.filter(
                i => { return i?.createdBy === user.user}
              ))}).catch(err => console.log(err))
          } else { 
            setPstdIssues(Issues?.filter(
            i => { return i?.createdBy === user.user}
            ))}
      }}
      getMyIsssues()
  // eslint-disable-next-line
  }, []);

  const issueList = useMemo(() => {
    return PstdIssues
  }, [PstdIssues])

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
                {Projects?.filter(p => p._id === params.value)[0]?.title}
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
  const getTheme = createTheme(theme)
  return (
    <>
    <ThemeProvider theme={getTheme}>
    <div 
    className='relative font-bold' 
    style={{
        // height: 'auto', 
        height: '50vh',
        width: '100%', 
        top: '3rem',
        flexGrow: 0.5 ,
        text: 'bold',  
        
        
        }}
    >
    <DataGrid
    rows={issueList}
    columns={columns}
    slots={{ toolbar: CustomToolbar }}
    slotProps={{
      toolbar: {
        issues: issueList,
        title: 'Posted by me',
        titleClass: 'font-bold text-[1.75em]'
      },
    }}
    pageSize={pageSize}
    onPageSizeChange={
    (newPageSize) => setPageSize(newPageSize)
    }

    hideFooterPagination
    disableDensitySelector
    disableSelectionOnClick

    getRowId={(row) => row._id}

    sx={DatagridStyle}
    GridLines="None"
    />
    </div>
    </ThemeProvider>
    </>
  )


}


// function CustomToolbar( props ) {

//     const issueCount = props?.issues?.length

//     return (
//     <div className='flex items-center font-lato'> 
//     <GridToolbarContainer sx={{m: 1.25}}>
//       <div className='flex items-center'> 
//       <div className='font-bold text-[1.75em]'>
//           Posted by me
//           <div className='text-[0.5em]'>
//               {issueCount + ' total'}
//           </div>
//       </div>
//       <GridToolbarQuickFilter 
//         sx={{
//             marginLeft: 4, 
//             marginTop: -2, 
//             textTransform:'none',
//             color: '#7895B3',
//         }}
//       />
//       </div>
//       </GridToolbarContainer>
//       </div>
//     );
//   };


  // const theme = createTheme({
  //   typography: {
  //    "fontFamily": `"Lato", sans-serif`,
  //    "fontSize": 14.5,
  //    "fontWeightLight": 400,
  //    "fontWeightRegular": 300,
  //    "fontWeightMedium": 400
  //   },
  //   palette: {
  //     primary: {
  //       main: '#7895B3',
  //         },
  //       role: {
  //         main: '#00000020',
  //         contrastText: '#000000',
  //       },
  //       projects: {
  //           main: '#00000020',
  //           contrastText: '#000000',
  //         },
  //     },
  
  //   components: {
  //     MuiDataGrid: {
  //         styleOverrides: {
  //             root: {
  //                 border: 'none'
  //             }
  //         }
  //     }
  // }
  
  // });
  
  


export default PostedList
import React, { useMemo, useState } from 'react'
import { Avatar, ThemeProvider, createTheme } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid, GridActionsCellItem} from '@mui/x-data-grid';
import { IssueContexts } from '../../../contexts/IssueContexts';
import { TeamContexts } from '../../../contexts/TeamContexts';
import TitleCase from '../../utils/TitleCase';
import { AiFillCheckSquare, AiFillTool } from 'react-icons/ai';
import { MdError } from 'react-icons/md';
import stringAvatar from '../../utils/UserAvatar/StringAvatar';
import { ProjContexts } from '../../../contexts/ProjectContexts';
import { DatagridStyle } from './DatagridStyle';
import { theme } from './theme';
import CustomToolbar from './CustomToolbar';

function List( ) {
    const {  
      Issues, setSelectedIssue, TableIssues,
      setEditIssueModal } = IssueContexts();
    const { Users } = TeamContexts();
    const { Projects, 
      // setProjects 
    } = ProjContexts();

    const [loaded, setLoaded] = useState(false);
    // allow user to search issues by assignee

  const rows = useMemo(() => {
    return TableIssues?.map((i, key) => {
      i.id = key;
      i.assigneeName = i?.assignedTo?._id ? i.assignedTo.firstName + ' ' + i.assignedTo.lastName : 'Unassigned'
      i.projectName = i?.project?.title
      if (key === Issues?.length - 1) setLoaded(true)
      return i
    })
  }, [TableIssues])

  // console.log(rows)
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
                // console.log(params.row._id);
                // console.log(Issues)
                setSelectedIssue({...params.row, 
                  assignedTo: params.row.assignedTo._id,
                  project: params.row.project._id
                }); 
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
          field: 'projectName', 
          headerName: 'Project', 
          flex: 0.3,
          width: 50,
          renderCell: (params) => {
            return (
              <>
              <div className='p-1 rounded-md bg-[#dddce8] text-[#454754]'>
                {params.value}
              </div>
              </>
            )
          }
      },

        { 
            field: 'assigneeName', 
            headerName: 'Assignee', 
            valueGetter: params => params?.value ?? 'Unassigned',
            
            flex: 0.5,
            renderCell: (params) => {
                if (params?.value !== 'Unassigned') return (
                    <div className='flex items-center'>
                    <Avatar 
                  className=' antialiased mr-3'
                  {...stringAvatar(params?.value, 22, 22, '0.75em')} 
                  
                  />
                        {params.value}
                    </div>
                )
                return (
                  
                  <div className='p-1 rounded bg-gray-200'>
                    Unassigned
                  </div>
                )
            },
            
        },

      ]

  const getTheme = createTheme(theme)
  const [pageSize, setPageSize] = useState(5);
  // if (!rows) return
  return (
    <>
    <ThemeProvider theme={getTheme}
    >

    <div 
    className='relative font-bold' 
    style={{
        height: '60vh', 
        width: '100%', 
        top: '3rem',
        flexGrow: 0.5 ,
        text: 'bold', 
        visibility: loaded ? 'visible' : 'hidden',
        opacity:    loaded ? '1'       : '0',
        transition: 'all 0.1s ease-in-out'
        }}
    >

    <DataGrid
    rows={rows}
    columns={columns}
    slots={{ toolbar: CustomToolbar }}
    
    slotProps={{
      toolbar: {
        issues: Issues,
        title: "Issues",
        titleClass: "font-bold text-[2em]"
      },
    }}

    // hideFooterPagination
    disableDensitySelector
    disableSelectionOnClick

    pageSize={pageSize}
    onPageSizeChange={
    (newPageSize) => setPageSize(newPageSize)
    }
    pagination
    pageSizeOptions={[5, 10, 15]}
    initialState={{
      
      pagination: { paginationModel: { pageSize } },
    }}
    // getRowId={(row) => row?._id}
    sx={DatagridStyle}
    GridLines="None"

    />

    </div>
    
    </ThemeProvider>
    </>
  )
}

export default List
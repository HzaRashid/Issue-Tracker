import React, { useEffect, useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { IssueContexts } from '../../contexts/IssueContexts'; 
import axios from 'axios';
import TitleCase from '../utils/TitleCase'; 
import { AiFillCheckSquare, AiFillTool } from 'react-icons/ai';
import { MdError } from 'react-icons/md';
import { ProjContexts } from '../../contexts/ProjectContexts';
import { AuthContexts } from '../../App/Auth';
import { DatagridStyle } from '../Home/Issues/DatagridStyle';
import CustomToolbar from '../Home/Issues/CustomToolbar';
import { theme } from '../Home/Issues/theme';

function AssigneeList() {
    const { 
      setSelectedIssue, setEditIssueModal,
      Issues,
      AsgndIssues, setAsgndIssues,
      // PstdIssues, setPstdIssues
      } = IssueContexts();
    const { Projects } = ProjContexts();
    const { user } = AuthContexts();

    useEffect(() => {
      const getMyIsssues = () => {
        if (!AsgndIssues?.length) {
          if (!Issues?.length) {
            axios.get(
              process.env.REACT_APP_API_Issues,
              { withCredentials: true })
            .then(res => { 
              setAsgndIssues(
                res.data.filter(
                  i => { return i?.assignedTo === user.user}
                ))}).catch(err => console.log(err))
            } else { 
            setAsgndIssues(Issues?.filter(
              i => { return i?.assignedTo === user.user}
              ))}
        }}
        getMyIsssues()
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
                {Projects?.filter(p => p._id === params.value)[0]?.title}
              </div>
              </>
            )
          }
      }

      ]


  const [pageSize, 
    // setPageSize
  ] = useState(10);
  const getTheme = createTheme(theme)
  return (
    <>
    <ThemeProvider theme={getTheme}>
    <div 
    className='relative font-bold' 
    style={{
        // height: 'auto', 
        height: '42.5vh',
        width: '100%', 
        top: '3rem',
        flexGrow: 0.5 ,
        text: 'bold',  
        }}
    >
    <DataGrid
    rows={AsgndIssues}
    columns={columns}
    slots={{ toolbar: CustomToolbar }}
    slotProps={{
      toolbar: {
        issues: AsgndIssues,
        title: 'Assigned to me',
        titleClass: 'font-bold text-[1.75em]'
      },
    }}
    pageSize={pageSize}

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
export default AssigneeList
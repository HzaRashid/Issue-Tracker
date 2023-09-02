import { GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid';
import React from 'react'

export function CustomToolbar( props ) {
    // console.log(props)
    const issueCount = props?.issues?.length
    // console.log(props.issueData)
    return (
    <div className='flex items-center font-lato'> 
      <GridToolbarContainer sx={{m: 1.25}}>

        <div className='flex items-center'> 
        <div className='font-bold text-[2em]'>
            Issues
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

export default CustomToolbar
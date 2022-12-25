import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';




const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#00000090',
      color: '#f5f5f5',
      maxWidth: 220,
      fontSize: '0.83rem',
      border: '1px solid #dadde9',
    },
  }
  ));


function AddProjModal() {

  return (

    
    <CustomTooltip title='New Project'> 
    <button className='absolute ml-[2rem] mt-[4rem] p-2 rounded-md 
    bg-[#e2e2e2] hover:bg-[#dbdbdb]'
    >
    <AiOutlinePlus size={30} color='#505050'/>
    </button>
    </CustomTooltip>


  )
}

export default AddProjModal
// eslint-disable-next-line
import React, { useState } from 'react'
import '../../../index.css'
// eslint-disable-next-line
// eslint-disable-next-line
import axios from 'axios';
// eslint-disable-next-line
import { BsFillArrowLeftCircleFill, BsCheck2Circle} from 'react-icons/bs';
import { CustomTooltip } from '../../CustomTooltip';
import { ProjContexts } from '../../../contexts/ProjectContexts';
const data = require('../../../pages/routes.json');


function Confirm({...props}) {
 
    const { 
        setProjStatus, 
        setProjModal, 
        Projects, setProjects
     } = ProjContexts();

     const newProjectReq = {
        title: props.Title,
        type: props.Type,
        assignedTo: props.Team,
        
    }

  return (
    <>
    <div>
    <h1 className='p-2 text-[1.1em] 
    text-[#505050] break-words font-normal'>
        Review
    </h1>
    </div>
    <div className={`${props.Team.length === 0 ? 'mr-[1.3em]':''} 
    flex items-center justify-center overflow-auto
    mt-[1em] lg:ml-[0.5em] mx-auto text-[1.4em] font-light`}>
        
        <div>
        <label htmlFor='Title' className='block'>
        <h1 className='text-[#505050] text-[0.9em]'>
                Title 
            </h1>
        </label>
            <div id='Title' 
            className='block text-[#2d695e] mt-1 shadow-sm
            bg-neutral-200 w-fit p-[0.15em] rounded-lg'
            >
                {props.Title}
            </div>

        <label htmlFor='Type' className='block mt-[1em] '>
        <h1 className='text-[#505050] text-[0.9em]' >
                Type 
         </h1>

        </label>
            <div id='Type' className='block text-[#2d695e] mt-1
            bg-neutral-200 w-fit p-[0.15em] rounded-lg shadow-sm
            '>
                {props.Type}
            </div>

        <label htmlFor='Team' className='block mt-[1em]'>
        <h1 className='text-[#505050] text-[0.9em]'>
            Team 
        </h1>
        </label> 
        {
        props.Team.length > 0 && 
            <div id='Team' className='block text-[#505050]'>
                <ul className='inline-block
                 w-[30vw] lg:w-[20vw]
                 text-[0.75em] whitespace-nowrap mt-1
                 break-normal overflow-x-auto overflow-y-auto'
                 >
                {
                    props.Team
                    .map(
                        (member, key) => 
                        <li key={key} className='inline-block pr-3 last:pr-0'>
                            <div className='text-[#2d695e] 
                            font-light shadow-sm
                            bg-neutral-200 w-fit p-[0.15em] rounded-lg'>
                                {member.firstName + ' ' + member.lastName}
                            </div>
                        </li>
                    )
                }
                </ul>
            </div>
            }
        {
            props.Team.length===0 &&
            <div>None</div>
        }

        </div>
    </div>

    {/* <div className='flex items-center justify-center mt-[4em]'> */}
    <div className='flex items-center justify-center mt-[3.5em]  '>

    <CustomTooltip title='Go back'>
    <button 
    className='hover:bg-[#e2e2e2] ease-in-out duration-100 mr-6'
    onClick={() => props.setShowReview(false)}
    >
        <BsFillArrowLeftCircleFill fontSize={'1.5em'} color='#505050'
        className='drop-shadow-sm'
        />
    </button>
    </CustomTooltip> 
    
    <CustomTooltip title='Confirm'>
    <button 
    type='submit'
    className='hover:bg-[#e2e2e2]
    ease-in-out duration-100'
    onClick={
        async () => {
        
        try {
        let response = await axios
                                .post(
                                data.Projects, 
                                newProjectReq
                                )
        console.log(response)

        if (response.status === 200){

            setProjStatus(200);
            setProjModal(false);
            props.setShowReview(false)
            props.ResetForm();
            setProjects([...Projects, newProjectReq])
  
        } 

        } catch (error) {
            console.log(error.response)
            setProjStatus(error.response.status)
            console.log(error.response.status)
        }
        
    }
    
    }
    >
        <BsCheck2Circle fontSize={'1.5em'} color='#558E5A'
        className='drop-shadow-sm'
        />
    </button>
    </CustomTooltip>
    </div>
    {/* </div> */}

    </>
  )
}

export default Confirm
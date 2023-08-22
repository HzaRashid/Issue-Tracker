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
        ProjStatus,
        setProjModal, 
        setEditProjModal,
        Projects, setProjects,
        EditProj, setEditProj

     } = ProjContexts();
    //  console.log(props)
     const newProjectReq = {
        _id: props?._id,
        title: props?.Title,
        assignedTo: props?.Team.map(user => user?._id),
    }
    console.log(EditProj)
  return (
    <>
    <div>
    <h1 className='p-2 text-[1.1em] 
    text-[#505050] break-words font-normal'>
       {`Review Project`}
    </h1>
    </div>
    <div className={`${props?.Team?.length === 0 ? 'mr-[1.3em]':''} 
    flex items-center justify-center overflow-auto
    mt-[1em] lg:ml-[0.5em] mx-auto text-[1.4em] font-light`}>
        
        <div>
        <div  className='block'>
        <h1 className='text-[#404040] text-[0.55em] font-normal'>
                Title 
            </h1>
        </div>
            <div id='Title' 
            className='block text-[#2d695e] mt-1  font-normal
            bg-neutral-200 w-fit p-[0.25em] rounded-lg text-[0.7em]'
            >
                {props.Title}
            </div>

        {/* <label htmlFor='Type' className='block mt-[1em] '>
        <h1 className='text-[#505050] text-[0.9em]' >
                Type 
         </h1>

        </label>
            <div id='Type' className='block text-[#2d695e] mt-1
            bg-neutral-200 w-fit p-[0.15em] rounded-lg shadow-sm
            '>
                {props.Type}
            </div> */}

        <div  className='block mt-[1em]'>
        <h1 className='text-[#404040] text-[0.55em] font-normal'>
            Team 
        </h1>
        </div> 
        {
        props?.Team?.length > 0 && 
            <div id='Team' className='block text-[#505050]'>
                <ul className='inline-block 
                 w-[30vw] lg:w-[20vw] font-normal
                 text-[0.7em] whitespace-nowrap mt-1 pb-3
                 break-normal overflow-x-auto overflow-y-auto'
                 >
                {
                    props.Team
                    .map(
                        (member, key) => 
                        <li key={key} className='inline-block pr-3 last:pr-0'>
                            <div className='text-[#2d695e] 
                            font-normal shadow-sm
                            bg-neutral-200 w-fit p-[0.2em] rounded-lg'>
                                {member.firstName + ' ' + member.lastName}
                            </div>
                        </li>
                    )
                }
                </ul>
            </div>
            }
        {
            props?.Team?.length===0 &&
            <div className='text-[0.9em]'>None</div>
        }

        </div>
    </div>

    {/* <div className='flex items-center justify-center mt-[4em]'> */}
    <div className='flex items-center justify-center mt-[3.5em] space-x-12  '>

    <CustomTooltip title='Go back'>
    <button 
    className='hover:bg-[#e2e2e2] ease-in-out duration-100 p-1 rounded-lg'
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
    ease-in-out duration-100 p-1 rounded-lg'
    onClick={
    async () => {
    try {
        if ( !EditProj ) {
            let response = await axios.post(
                data.Projects, newProjectReq)
            console.log(response)

            if (response.status === 200) {
                setProjStatus(200);
                setProjModal(false);
                props.setShowReview(false)
                props.ResetForm();
                setProjects([...Projects, { ...newProjectReq, 
                _id: response.data?._id }])
            }
            return
    }  
    let titleRes = await axios
                            .put(
                            data.Projects + '/title', 
                            newProjectReq
                            );
    let teamRes = await axios
                            .put(
                            data.Projects + '/team', 
                            newProjectReq
                            )
                            
    
    if ( titleRes.status === 200 && 
          teamRes.status === titleRes.status ) {
        setEditProjModal(false)
        setProjStatus(200);
        setProjModal(false);
        props.setShowReview(false)
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
    <div className='absolute'> 
    </div>
    </>
  )
}

export default Confirm
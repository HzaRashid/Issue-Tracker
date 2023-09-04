import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { ProjContexts } from '../../../../../contexts/ProjectContexts'
import { SprintContexts } from '../../../../../contexts/SprintContexts';
import { CustomTooltip } from '../../../../CustomTooltip';
import { AiOutlineClose } from 'react-icons/ai';
import { BsChevronDown, BsArrowRightShort } from 'react-icons/bs';
import { useStateContext } from '../../../../../contexts/ContextProvider';
import axios from 'axios';


function DeleteStageForm() {
    const { SelectedProj } = ProjContexts();
    const { 
      SelectedStage, 
      setOpenDeleteStage, 
      SelectedSprint, setSelectedSprint,
      items
    } = SprintContexts();
    const { ScreenWidth } = useStateContext();
    const isMobile = ScreenWidth < 768
    // console.log(SelectedStage)
    const [ShowStages, setShowStages] = useState(false);

    const formik = useFormik({
        initialValues: {
            transferStage: '',
        },
        validationSchema: Yup.object({
            transferStage: Yup.string()
                  .required('Required'),
      }),
  
      })

      const handleSuccessClose = () => {
        setOpenDeleteStage(false);
        setShowStages(false)
        formik.resetForm()
      }
      
    // console.log(SelectedStage)
  return (
    <> 
    <div className='sticky top-0 bg-inherit flex items-center justify-between'>
    <h1 className='p-3 text-[1.05em] 
      text-[#6a6a6a] break-words font-lato flex items-center' >
        Delete Stage:     
    </h1>
    <div className='flex items-center mr-3 shadow-sm
    bg-neutral-200  rounded-lg p-1 w-fit whitespace-pre'>
    <div className='text-[#497770] text-[0.9em]
    bg-neutral-200 '
    >
    <p className='font-light'>{SelectedProj?.title}</p>
    </div>
    </div>
    </div>

    <ul className={`
    ${
      ShowStages && isMobile ? 'pb-[3.4em]' : null
    }
    h-auto mt-[0.5em] overflow-auto`}>

    <li> 
    <div className='flex items-center text-[0.95em] p-3'>
        <div className='flex items-center text-[#505050] tracking-[0.01em]'> 
        Delete this stage: 
        <div className='p-1 ml-2 rounded-md text-[0.85em]
        font-normal text-[#763e3e] bg-[#6b4c4c14] break-words 
        font-lato shadow-sm '>
        {SelectedStage?.title?.toUpperCase()}
        </div>
        </div>
    </div>
    </li>

    <li className='text-[0.95em] whitespace-nowrap'> 
    <div className='flex items-center'> 
    <div className='flex items-center mt-[0.1em]text-[#202020] p-3'>

    <p className='flex items-center font-light whitespace-pre'>
            Move existing issues to
        <BsArrowRightShort className='mx-[0.2em]' style={{fontSize:'1.6em', color: '#505050'}}/>
        </p>
    </div>

    <div className={`${isMobile ? 'sticky top-0' : null}`}> 
        <div className={`
        flex items-center justify-between
        bg-[#6b859e21] text-[#5a6878] p-[0.2em] 
        hover:cursor-pointer rounded-md w-[10em] 
        whitespace-nowrap ml-[-0.4em] shadow-sm`}
        onClick={() => {
          formik.setFieldTouched('transferStage', ShowStages);
          setShowStages(!ShowStages);
        }}
        id='transferStage'
        name='transferStage'
        onBlur={formik.handleBlur}
        >
          <div className='ml-1 w-[10em] text-[0.925em]'>
           {
            formik.values.transferStage.length ? 
            formik.values.transferStage?.toUpperCase() :
            'Select Stage..'
          }
          </div>
          <div className='mr-1'>
          <BsChevronDown className={`
          ${ShowStages ? 'rotate-180' : 'rotate-0'} 
          ease-in-out duration-100`}
          />
          </div>
        </div>

        { ShowStages &&

        <ul className='absolute bg-[#dbdcde] text-[#585c60] max-h-[3.8em]
        w-[10em] rounded-md shadow-md z-10 ml-[-0.4em] mt-1 overflow-auto'
        >
        {
        SelectedSprint?.stages?.filter(
            stage => stage?.title?.toLowerCase() !== SelectedStage?.title?.toLowerCase()

        )
        .map(
          (stage, index) => (
          <li 
          key={index} 
          className='rounded-md p-1 
          hover:cursor-pointer hover:bg-[#00000008]'
          onClick={() => {
            formik.setFieldValue('transferStage', stage?.title)
            setShowStages(false);
          }}
          >
            
            <div className='ml-2 text-[0.925em]'> {stage?.title?.toUpperCase()} </div>

          </li>
          )
        )
        }
        </ul>
        }

    </div>
    </div>

    </li>

    </ul>


    <div className='flex items-center-center mt-[1em] justify-between'> 
    <CustomTooltip title='Cancel' placement='top'>
    <button 
    className='float-left hover:bg-[#e2e2e2] 
    ml-[0.25em] ease-in-out duration-100'
    onClick={handleSuccessClose}
    >
    <AiOutlineClose fontSize={'1.5em'} color='#202020'/>
    </button>
    </CustomTooltip>

    {
    (
    formik.isValid && 
    formik.values.transferStage.replace(/\s/g, '').length > 0
    ) &&
    <div className='flex items-center text-[0.925em] mr-[0.25em]
    text-[#e5e5e5]  break-words font-lato font-normal	
    bg-[#9c5656] p-1 rounded-lg hover:cursor-pointer shadow-sm
    transition ease-in-out delay-50 hover:scale-105 duration-150'

    onClick={() => {
      const issueIds = items[SelectedStage?.title].map(
        item => item?._id
        )

      axios.put(
        
        process.env.REACT_APP_API_Issues + '/many-issues-stage',
        {
          sprintID: SelectedSprint?._id,
          stage: formik.values.transferStage,
          issues: issueIds,
          deleteStage: SelectedStage ? SelectedStage : null,

        }, { withCredentials: true }
      )
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          handleSuccessClose()
          setSelectedSprint(
            prevState => ({
              ...prevState,
              stages: prevState.stages.filter(stage => 
                stage?.title !== SelectedStage?.title
                )
            })
          )          
        }
      })
      .catch(err => console.log(err))

    }}
    >
    Delete
    </div>
    }
    </div>
    </>
  )
}

export default DeleteStageForm
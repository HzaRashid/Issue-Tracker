import React from 'react'
import { AiOutlineClose, AiOutlineCloseCircle } from 'react-icons/ai';
import { SprintContexts } from '../../../../../contexts/SprintContexts';
import { CustomTooltip } from '../../../../CustomTooltip';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { ProjContexts } from '../../../../../contexts/ProjectContexts';
import { useStateContext } from '../../../../../contexts/ContextProvider';
import axios from 'axios';

function Form() {

    const { 
        setOpenIssuesLimit, 
        SelectedStage, 
        SelectedSprint, 
        setSelectedSprint,
        // items
      } = SprintContexts();

    const { SelectedProj } = ProjContexts();

    const { ScreenWidth } = useStateContext();
    const isMobile = ScreenWidth < 768;

    const formik = useFormik({
        initialValues: {
            IssueLimit: '',
        },
        validationSchema: Yup.object({
            IssueLimit: Yup.number()
                        .nullable()
                        .min(0, 'Enter a number between 0 and 1000')
                        .max(1000, 'Enter a number between 0 and 1000')
                        .typeError('Enter a number between 0 and 1000'),
        }),
      })

      const handleSuccessClose = () => {
        setOpenIssuesLimit(false);
        formik.setFieldValue('IssueLimit', undefined);
        formik.resetForm()
      }

  return (
    <> 
    <div className='sticky top-0 bg-inherit flex items-center justify-between'>
    <h1 className='p-3 text-[1.05em] 
      text-[#6a6a6a] break-words font-lato flex items-center' >
        Issue Limit
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
    <div className='flex items-center justify-center 
    h-auto max-h-[18vh] overflow-auto mt-[1em]'>
    <div className='color-[#0000001a] font-light'>
      <label
      className='block mb-[0.2em] text-[0.8em] text-[#505050]'
      >
        Set Issue Limit
      </label>
    <div className='flex items-center'> 
    <input 

    name='IssueLimit'
    placeholder='Limit is not set'
    className={`block bg-[#0000001a]
    w-[${isMobile ? '22.5vw' : '16.5vw'}] rounded-lg outline-none font-light
    p-[0.2em] placeholder:text-[#787878]`}
    value={formik.values.IssueLimit}
    onClick={() => formik.setFieldTouched('IssueLimit', true)}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    autoFocus
    onFocus={() => formik.setFieldTouched('IssueLimit', true)}
    >
    </input>
    {
        formik.touched.IssueLimit && formik.values.IssueLimit ?
        <button className={`absolute ml-[11em]`}
        onClick={() => formik.setFieldValue('IssueLimit', '')}
        >
        <AiOutlineCloseCircle color='#707070'/>
        </button> 
        : null
    }
    </div>
    {
        formik.touched.IssueLimit && formik.errors.IssueLimit ?
        <div
        className='text-[#c94e4e] text-[0.75em] absolute'
        >
          {formik.errors.IssueLimit}
        </div> : null
    }
    </div>

    </div>

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
    formik.isValid && formik.values.IssueLimit ?
    <div className='flex items-center text-[0.925em] mr-[0.25em]
    text-[#4f745f] antialiased break-words font-lato font-normal	
     p-1 rounded-lg hover:cursor-pointer drop-shadow-sm hover:bg-[#4f745f0a]
    transition ease-in-out delay-50 hover:scale-105 duration-150'
    onClick={() => {
      console.log('here')
      axios.put(
        process.env.REACT_APP_API_Sprints + '/update-stage-issue-limit',
        {
          sprintID: SelectedSprint?._id,
          stageTitle: SelectedStage?.title,
          newLimit: formik.values.IssueLimit
        }, 
        { withCredentials: true }
      )
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          handleSuccessClose()
          setSelectedSprint(
            prevState => ({
              ...prevState,
              stages: prevState.stages?.map(stage => {
                if (stage?.title?.toLowerCase() === SelectedStage?.title?.toLowerCase()) {
                  return {...stage, issue_limit: formik.values?.IssueLimit}
                }
                return stage
              }
                )
            })) 
            
        }
      })
      .catch(err => console.log(err))
    }}
    >
      Confirm
    </div> : null
      }
    
    </div>
    </>
  )
}

export default Form




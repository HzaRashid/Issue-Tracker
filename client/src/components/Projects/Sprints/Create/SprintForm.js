import React from 'react';
import { SprintContexts } from '../../../../contexts/SprintContexts';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CustomTooltip } from '../../../CustomTooltip';
import { ProjContexts } from '../../../../contexts/ProjectContexts';
import { 
  AiOutlineClose 
} from 'react-icons/ai'
import { BsCheck2Circle } from 'react-icons/bs'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './Datepicker.scss'
import axios from 'axios';
import { useStateContext } from '../../../../contexts/ContextProvider';


const data = require('../../../../pages/routes.json')


function SprintForm() {
    const { 
      setSprintModal,
      Sprints, setSprints,
      setSprintStatus,
      setSelectedSprint
     } = SprintContexts();
    const { SelectedProj } = ProjContexts();
    
   const { ScreenWidth } = useStateContext();
   const isMobile = ScreenWidth < 768;



    const formik = useFormik({
        initialValues: {
            SprintTitle: '',
            Issues: [],
            dateRange: [null, null],
            

        },
        validationSchema:  Yup.object({
          SprintTitle: Yup.string()
                  .required('Required')
                  .max(30, "30 characters max"),
          dateRange: Yup.array()
                    .of(
                      Yup.date()
                      .nullable()
                      .required('Required')
                      )
                      

  

      }),
      })
      const [startDate, endDate] = formik.values.dateRange;
    
  return (
    <>
    
       <div className='sticky top-0 bg-inherit flex items-center justify-between'>
    <h1 className='p-3 pr-[0.4em] text-[1.05em] 
      text-[#6a6a6a] break-words font-normal'>
        New Sprint
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
    <div className='flex items-center justify-center mt-[2em] font-light' id='sprint-form'> 
    <ul className='h-[40vh] overflow-auto'>
    <li className='color-[#0000001a]'>
      <label
      className='block mb-[0.2em] text-[0.95em] text-[#505050]'
      >
      <div className='flex items-center'>
        <p>Title</p>
        <p className='text-[#c94e4e]'>*</p>
      </div>
      </label>

      <input id='SprintTitle' 
      name='SprintTitle' 
      type='text' 
      placeholder='Sprint title..' 
      className='block bg-[#0000001a] lg:w-[20em] md:w-[20em] 
      w-[50vw] rounded-lg outline-none font-light 
      p-[0.2em] placeholder:text-[#787878]'
      value={formik.values.SprintTitle}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      >
        </input>
      {
      (formik.errors.SprintTitle && formik.touched.SprintTitle) &&
      <div
      className='text-[#c94e4e] text-[0.75em]'
      >
        {formik.errors.SprintTitle}
        </div>
      }
      </li>

      <li className='color-[#0000001a] mt-[2em]' id='test'>

      <label
      className='block mb-[0.2em] text-[0.95em] text-[#505050]'
      >

      <div className='flex items-center'>
        <p>Date Range</p>
        <p className='text-[#c94e4e]'>*</p>
      </div>
      </label>

      <DatePicker
      name='dateRange'
      disabledKeyboardNavigation
      shouldCloseOnSelect={false}
      minDate={new Date()} 
      // selected={new Date()} 
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      onChange={
        (dateRange) => {
        formik.setFieldValue( 
          'dateRange', dateRange, true
          );
      }}
      
      portalId='OVERLAY'
      withPortal={isMobile}
      onBlur={formik.handleBlur}
      onCalendarClose={
        () =>  formik.setFieldTouched('dateRange', true)
      }

      />  
      {

        (formik.errors.dateRange && formik.touched.dateRange) && 
        (startDate === null || endDate === null) &&
      <div
      className='text-[#c94e4e] text-[0.75em]'
      >
        {formik.errors.dateRange[0] || 'End date required'}
        </div>
      }
      

      </li>
      </ul>
      </div>

    <div className='text-center '> 
    <CustomTooltip title='Cancel' placement='top'>
    <button 
    className='float-left hover:bg-[#e2e2e2] 
    ml-[0.25em] ease-in-out duration-100'
    onClick={() => {
      setSprintModal(false);
      formik.resetForm()
    }}
    >
      <AiOutlineClose fontSize={'1.5em'} color='#202020'/>
    </button>
    </CustomTooltip>
    </div>
    {
    (
    formik.isValid && 
    formik.values.SprintTitle.replace(/\s/g, '').length > 0
    ) &&

    <CustomTooltip title='Submit' placement='top'>
    <button type="submit"
    className='float-right hover:bg-[#e2e2e2] 
    mr-[0.25em] ease-in-out duration-100'
    onClick={
      async () => {

        var Sprint = {
          title: formik.values.SprintTitle,
          startDate: startDate,
          endDate: endDate,
          project: SelectedProj?._id,
        }

        try {
          let response = await axios
                                  .post(
                                  data.Sprints, 
                                  Sprint
                                  )

          console.log(response);
  
          if (response.status === 200) {
  
              setSprintStatus(200);
              setSprintModal(false);
              formik.resetForm();
              
              Sprint._id = response.data?.SprintID;
              setSprints([...Sprints, Sprint])
              setSelectedSprint(Sprint);
    
          } 
  
          } catch (error) {
            if (error) {
              console.log(error)
              setSprintStatus(error.response.status)
            }
          }
      }
    }
    >
      <BsCheck2Circle fontSize={'1.5em'} color='#538A58'/>
    </button>

    </CustomTooltip>
    }

    </>
  )
}

export default SprintForm


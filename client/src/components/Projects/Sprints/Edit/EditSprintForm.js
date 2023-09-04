import React, { useEffect } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { CustomTooltip } from '../../../CustomTooltip';
import { BsCheck2Circle, BsFillArrowRightCircleFill } from 'react-icons/bs';
import { SprintContexts } from '../../../../contexts/SprintContexts';
import { ProjContexts } from '../../../../contexts/ProjectContexts';
import { useStateContext } from '../../../../contexts/ContextProvider';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../Create/Datepicker.scss'
import axios from 'axios';


function EditSprintForm() {

    // const { setEditSprintModal } = SprintContexts()
    const {
      setEditSprintModal, 
      setSprintModal,
      Sprints, setSprints,
      setEditSprintStatus,
      setSelectedSprintEdit,
      SelectedSprintEdit
     } = SprintContexts();
    const { SelectedProj } = ProjContexts();
    
   const { ScreenWidth } = useStateContext();
   const isMobile = ScreenWidth < 768;

  //  useEffect(() => console.log(SelectedSprintEdit));

  //  const [Title, setTitle] = useState('');
  //  const handleTitle = e => setTitle(e.target.event);
   

    const formik = useFormik({
        initialValues: {
          EditSprintTitle: '',
          Issues: [],
          dateRange: [null, null],
        },
        validationSchema:  Yup.object({
          EditSprintTitle: Yup.string()
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

      useEffect(() => {

        // console.log(startDate)
      if (SelectedSprintEdit?.title) formik.setFieldValue(
                                      'EditSprintTitle', 
                                  SelectedSprintEdit?.title);

      }
      , [SelectedSprintEdit])
      
      const [startDate, endDate] = formik.values.dateRange;
      useEffect(() => {
        if (SelectedSprintEdit?.startDate) {
          formik.setFieldValue('dateRange', [
            new Date(SelectedSprintEdit?.startDate), 
            new Date(SelectedSprintEdit?.endDate)
          ]);
        }
      }, [SelectedSprintEdit])

  return (
    <>
        <>
    
    <div className='sticky top-0 bg-inherit flex items-center justify-between'>
 <h1 className='p-3 pr-[0.4em] text-[1.05em] 
   text-[#252525] break-words font-normal'>
     Edit Sprint
     </h1>

 <div className='flex items-center mr-3 shadow-sm
 bg-neutral-200  rounded-lg p-1 w-fit whitespace-pre'>

 <div className='text-[#497770] text-[0.9em]
 bg-neutral-200 '
 >
   <p className='font-normal'>{SelectedProj?.title}</p>
 </div>
 </div>
 </div>
 <div className='flex items-center justify-center mt-[2em] font-light' id='edit-sprint-form'> 
 <ul className='h-[40vh] overflow-auto'>
 <li className='color-[#0000001a]'>
   <label
   className='block mb-[0.2em] text-[0.825em] text-[#303030]'
   >
   <div className='flex items-center font-normal'>
     <p>Title</p>
     <p className='text-[#b15454]'>*</p>
   </div>
   </label>

   <input id='EditSprintTitle' 
   name='EditSprintTitle' 
   type='text' 
   placeholder='Sprint title..' 
   className='block bg-[#0000001a] lg:w-[20em] md:w-[20em] 
   w-[50vw] rounded-lg outline-none font-normal text-[0.9em]
   p-[0.2em] placeholder:text-[#787878] placeholder:text-[0.9em]'
   value={formik.values.EditSprintTitle}
   onChange={formik.handleChange}
   onBlur={formik.handleBlur}
   >
     </input>
   {
   (formik.errors.EditSprintTitle && formik.touched.EditSprintTitle) &&
   <div
   className='text-[#b15454] text-[0.725em] font-normal'
   >
     {formik.errors.EditSprintTitle}
     </div>
   }
   </li>

   <li className='color-[#0000001a] mt-[2em]' id='test'>

   <label
   className='block mb-[0.2em] text-[0.825em] text-[#303030]'
   >

   <div className='flex items-center font-normal'>
     <p>Date Range</p>
     <p className='text-[#b15454]'>*</p>
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
   className='text-[#b15454] text-[0.725em] font-normal'
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
  setEditSprintModal(false);

   setTimeout(() => {
    formik.resetForm();
    setSelectedSprintEdit({});
   }, 500)
 }}
 >
   <AiOutlineClose fontSize={'1.5em'} color='#202020'/>
 </button>
 </CustomTooltip>
 </div>
 {
 (
 formik?.isValid && 
 formik.values.EditSprintTitle?.replace(/\s/g, '').length > 0
 ) &&

 <CustomTooltip title='Submit' placement='top'>
 <button type="submit"
 className='float-right hover:bg-[#e2e2e2] 
 mr-[0.25em] ease-in-out duration-100'
 onClick={
   async () => {

    //  const sprintBody = {
    //   sprintID: SelectedSprintEdit._id,
    //   title: formik.values.EditSprintTitle,
    //   startDate: startDate,
    //   endDate: endDate,
    //  }

     try {
       let response = await axios.put(
        process.env.REACT_APP_API_Sprints + '/edit', 
        {
          sprintID: SelectedSprintEdit._id,
          title: formik.values.EditSprintTitle,
          startDate: startDate,
          endDate: endDate,
        },
        { withCredentials: true })

      //  console.log(response);

       if (response.status === 200) {

          setEditSprintStatus(200);
          if (formik.values.EditSprintTitle !== SelectedSprintEdit?.title) {
            setSprints(Sprints.map(s => {
                if (s._id !== SelectedSprintEdit._id) return s
                s.title = formik.values.EditSprintTitle
                return s
              }))
          }

           setTimeout(() => {
            setEditSprintModal(false);
           }, 1000)

           setTimeout(() => {
            formik.resetForm();
            setSelectedSprintEdit({});
           }, 1200)
          

 
       } 

       } catch (error) {
         if (error) {
          //  console.log(error)
           setEditSprintStatus(error.response.status)
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
    
    </>
    
    
  )
}

export default EditSprintForm
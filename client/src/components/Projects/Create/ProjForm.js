// eslint-disable-next-line
import React, { useState } from 'react'
import '../../../index.css'
// eslint-disable-next-line
import { useStateContext } from '../../../contexts/ContextProvider';
import { TeamContexts } from '../../../contexts/TeamContexts';
import { ProjContexts } from '../../../contexts/ProjectContexts';
import { useFormik } from 'formik'
import * as Yup from 'yup'
// eslint-disable-next-line
import {
  AiFillCaretUp, 
  AiFillCaretDown,
  AiFillCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineClose
} from 'react-icons/ai';
import { BsFillArrowRightCircleFill, BsChevronDown } from 'react-icons/bs';
import { CustomTooltip } from '../../CustomTooltip';
import Confirm from './Confirm';

import { ProjTypes } from './ProjTypes';




function ProjForm( {showReview, setShowReview} ) {

    const { Users } = TeamContexts();
    const { setProjModal, Projects } = ProjContexts();

    const [Search, setSearch] = useState('');
    const [showUsers, setShowUsers] = useState(false);
    // const [ShowTypes, setShowTypes] = useState(false)

    const UniqueTitleMsg = 'A project with this title already exists'

    function uniqueTitle() {
      return this.test("unique", UniqueTitleMsg, function (value) {
        const { path, createError } = this;
    
        if ( Projects.filter(proj => proj.title===value).length ) {
            return createError({ path, message: UniqueTitleMsg });
          }
        return true;
      });
    }

    Yup.addMethod(Yup.string, 'uniqueTitle', uniqueTitle)
 
  
    const formik = useFormik({
    initialValues: {
        ProjTitle: '',
        ProjTeam: [],
    },
    validationSchema: Yup.object({
        ProjTitle: Yup.string()
                .required('Required')
                .max(30, "30 characters max")
                .uniqueTitle(),

        ProjTeam: Yup.array().max(Users.length)
    })
    }
    )

  return (
    <>
    { !showReview &&
    <>
    <div className='sticky top-0 bg-inherit'>
    <h1 className='p-3 text-[1.05em]
      text-[#404040] font-normal break-words '>
        {formik.values.ProjTitle ? 
          'New Project: ' + 
          formik.values
          .ProjTitle.substring(0,20) + 
          '..'
          : 'New Project: '}
      </h1>
    </div>
      <div className='flex items-center justify-center mt-[1em] font-normal'>

      <ul className='h-auto max-h-[50vh] overflow-auto'>

      <li className='mt-[0.65em]'>
      <label 
      className='mb-[0.2em] 
      text-[0.95em] text-[#505050]'
      >
        <div className='flex items-center text-[0.9em] text-[#404040]'>
          <p>Title</p>
          <p className='text-[#a44e4e]'>*</p>
        </div>
      </label>
      <input id='title' type='text' placeholder='Project name..' 
      className='block bg-[#0000001a] lg:w-[20em] md:w-[20em] 
      w-[50vw] rounded-lg outline-none font-normal text-[0.9em]
      p-[0.2em] placeholder:text-[#787878]'
      name='ProjTitle'
      value={formik.values.ProjTitle}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      >
      </input>
      {
      (formik.errors.ProjTitle && formik.touched.ProjTitle) &&
      <div
      className='text-[#a44e4e] text-[0.65em]'
      >
        {formik.errors.ProjTitle}
        </div>}
      </li>
      

    
    <li className=' mt-[2em] color-[#0000001a]'>
    <label
      className='block mb-[0.2em] text-[0.9em] text-[#404040]'
      >
        Team
      </label>
      {
        formik
        .values
        .ProjTeam
        .length > 0 &&

      <ul className='inline-block lg:w-[26.5em] md:w-[26.5em] 
      w-[50vw] text-[0.75em] whitespace-nowrap
          break-normal overflow-x-auto '>
        {
          formik
          .values
          .ProjTeam
          .map(
            (user, key) => (
              <li className='inline-block' key={key}>
                <div className='flex items-center'>
                <div className='flex items-center m-1 p-1 
                bg-[#d5d5d5] rounded-md shadow-sm'>
                  {user.firstName + ' ' + user.lastName}
                  <CustomTooltip title='Remove'>
                  <button onClick={
                    () => formik
                    .setFieldValue(
                      'ProjTeam',
                      formik
                      .values
                      .ProjTeam
                      .filter(
                        u => u._id !== user._id
                      ))
                  }>
                  <AiOutlineCloseCircle 
                  className='ml-1' color='#505050'/>
                  </button>
                  </CustomTooltip>
                </div>
                </div>
              </li>
            )

          )
        }
      </ul>
      }
      
      <div className='flex items-center'>
      <input id='team' type='text' placeholder='Search users..' 
      className='block bg-[#0000001a] lg:w-[20em] md:w-[20em] 
      w-[50vw] rounded-lg outline-none font-normal text-[0.9em]
      p-[0.2em] placeholder:text-[#787878]'
      value={Search}
      onChange={(e) => setSearch(e.target.value)}
      onClick={() => setShowUsers(true)}
      onBlur={formik.handleBlur}
      >
      </input>

      <CustomTooltip title={showUsers ? 'Close List' : 'Open List'}>
      <button onClick={() => setShowUsers(!showUsers)}>
        {showUsers ? 
           <AiFillCaretUp color='#505050'/> : 
           <AiFillCaretDown color='#505050'/>
        }
      </button>
      </CustomTooltip>
      </div>
    {
    showUsers && 
    <ul className='bg-[#eaeaea] h-[6em] overflow-y-auto
    lg:w-[20em] md:w-[20em] w-[50vw] text-[0.9em]' 
    >
    {
      Users
      .filter(// eslint-disable-next-line
        user => {
          if (Search==='') {
            return user
          } 
          else if (
            `${user.firstName + ' ' + user.lastName}`
              .toLowerCase()
              .includes(Search.toLowerCase())
              ) {
          return user
        }
      }
      )
      .map(
        (user, key) =>
        <li key={key}
        className={`${
          formik
          .values
          .ProjTeam
          .filter(
            u => u._id===user._id
          )
          .length > 0 ? 
          'bg-[#dbdbdb]' : 'bg-auto hover:bg-slate-200'
        } 
          hover:cursor-pointer rounded-md p-1
          `}
        
        onClick={() => {
          
          const alreadyUser = formik
                              .values
                              .ProjTeam
                              .filter(
                              u => u._id===user._id
                              );
          
          if (!alreadyUser.length) {
            formik
            .setFieldValue(
              'ProjTeam', 
              [...formik.values.ProjTeam, user]
              )
          } else {
            formik
            .setFieldValue(
              'ProjTeam',
              formik
              .values
              .ProjTeam
              .filter(
                u => u._id !== alreadyUser[0]._id
              ))
            }
        }
        }
        >

          <div className='flex items-center justify-between'>
            {user.firstName + ' ' + user.lastName}
          
          <div className='float-right mr-[0.3em]'>
          { 
          formik
          .values
          .ProjTeam
          .filter(
            u => u._id===user._id
            )
            .length > 0 &&
          <AiFillCheckCircle color='#5B9960' fontSize={'1.15em'}/>
          }
          </div>
          </div>
        </li>
      )
        }
    </ul>
    }
    </li>
    </ul>
    </div>  



  <div className='text-center mt-[3.25em]'>

    <CustomTooltip title='Cancel' placement='top'>
      <button 
      className='float-left hover:bg-[#e2e2e2] ml-[0.25em] ease-in-out duration-100'
      onClick={() => {
        setProjModal(false);
        setShowUsers(false);
       
        formik.resetForm();
      }}
      >
        <AiOutlineClose fontSize={'1.5em'} color='#202020'
        className='drop-shadow-sm'
        />
      </button>
      </CustomTooltip>

    {
      formik.isValid && 
      formik.values.ProjTitle.replace(/\s/g, '').length > 0 &&
      

      <CustomTooltip title='Continue' placement='top'>
      <button type="button"
      className='float-right hover:bg-[#e2e2e2] 
      mr-[0.25em] ease-in-out duration-100'
      onClick={() => setShowReview(true)}
      >
        <BsFillArrowRightCircleFill fontSize={'1.5em'} color='#538A58'
        className='drop-shadow-sm'
        />
      </button>
 
      </CustomTooltip>
      }

  </div>


      </>
    }        
    { 
    showReview && 
    <Confirm         
    showReview={showReview} 
    setShowReview={setShowReview}
    Title={formik.values.ProjTitle}
    Team={formik.values.ProjTeam}
    ResetForm={formik.resetForm}
    /> 
    }
      
    </>
  )
}

export default ProjForm
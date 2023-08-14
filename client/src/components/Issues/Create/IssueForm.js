import React, { useState } from 'react'
import { CustomTooltip } from '../../CustomTooltip';
import { AiOutlineClose, AiOutlineCloseCircle } from 'react-icons/ai'
import { IssueContexts } from '../../../contexts/IssueContexts';
import { TeamContexts } from '../../../contexts/TeamContexts';
import { ProjContexts } from '../../../contexts/ProjectContexts';
import { SprintContexts } from '../../../contexts/SprintContexts';
import { useFormik } from 'formik'
import { AiFillCaretUp, AiFillCaretDown } from 'react-icons/ai'
import * as Yup from 'yup'
import { BsCheck2Circle, BsChevronDown} from 'react-icons/bs'
import axios from 'axios';
import { Types } from './Types';
import { isEmpty } from '../../utils/isEmptyObject';
import { Avatar } from '@mui/material';
import stringAvatar from '../../utils/UserAvatar/StringAvatar';
import { AuthContexts } from '../../../App/Auth';

const data = require('../../../pages/routes.json')

function IssueForm() {
    const { 
      setIssueModal, 
      setIssueStatus,

    } = IssueContexts();

    const { 
      SelectedProj,
      Backlog, setBacklog
     } = ProjContexts();

    const { 
      Sprints,
      // SelectedSprint, setSelectedSprint,
      NewSprintIssue, setNewSprintIssue,
      SprintIssues, setSprintIssues
    } = SprintContexts();

    const { Users } = TeamContexts();
    const { user } = AuthContexts()

    const [Search, setSearch] = useState('');
    const [showUsers, setShowUsers] = useState(false);
    const [ShowTypes, setShowTypes] = useState(false);
    const [ShowSprints, setShowSprints] = useState(false);
    const [SelectedSprint, setSelectedSprint] = useState({});
    
    


    const formik = useFormik({
      initialValues: {
          IssueSummary: '',
          IssueType: '',
          assignTo: [],
          sprint: SelectedSprint ? SelectedSprint?.title : ''
      },
      validationSchema: Yup.object({
        IssueSummary: Yup.string()
                .required('Required')
                .max(100, "100 characters max"),
                
  
        IssueType: Yup.string()
                .required('Required'),
  
        assignTo: Yup.array().max(1),

        sprint: NewSprintIssue ? 
        Yup.string().required('Required') : Yup.string()
    }),

    })

    // const SelSprint = SelectedSprint;
  return (
    <>

    <div className='sticky top-0 bg-inherit flex items-center justify-between'>
    <h1 className='p-3 pr-[0.4em] text-[1.05em] 
      text-[#6a6a6a] break-words font-lato ' >
        New Issue
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

    <div className='flex items-center justify-center mt-[1.75em]'>
    <ul className='h-[40vh] overflow-auto'>

    <li className='color-[#00000010] font-light'>
      <label
      className='block mb-[0.2em] text-[0.95em] text-[#505050]'
      >
      <div className='flex items-center'>
        <p className='font-normal text-[0.875em] text-[#303030]'>Type</p>
        <p className='text-[#c94e4e] whitespace-pre'> *</p>
      </div>
      </label>


        <div className={`
        flex items-center bg-[#00000010] text-[#505050] text-[0.95em]
        p-[0.2em] w-fit hover:cursor-pointer rounded-md font-normal `}
        onClick={() => {
          if (ShowTypes) formik.setFieldTouched('IssueType', true);
          setShowTypes(!ShowTypes);
        }}
        id='IssueType'
        name='IssueType'
        onBlur={formik.handleBlur}
        >
          <div className='text-[#303030]'>
           {
            formik.values.IssueType.length ? 
            <>
            <div className='text-[0.975em]'>
              {formik.values.IssueType}
            </div>
            </> :
              <>
              <div className='text-[0.925em]'>
                Issue Type..
              </div>
              </>
          }
          </div>
          <div className='ml-2'>
          <BsChevronDown className={`
          ${ShowTypes ? 'rotate-180' : 'rotate-0'} 
          ease-in-out duration-100`}
          />
          </div>
        </div>

      { ShowTypes &&
        <ul className='bg-[#00000010] text-[#505050] 
        w-[7em] rounded-md shadow-md mt-[0.2em] text-[0.9em]'
        >
        {
        Types.map(
          (type, index) => (
          <li 
          key={index} 
          className='rounded-md  w-[7em] p-1 
          hover:cursor-pointer hover:bg-[#00000008]'
          onClick={() => {
            formik.setFieldValue('IssueType', type.title)
            setShowTypes(false);
          }}
          >
            
            <div className='flex items-center font-normal'> 
            <div> {type.icon} </div>
            <div className='ml-2'> {type.title} </div>
            </div>

          </li>
          )
        )
        }

        </ul>
      }
      
      
    {
    formik.touched.IssueType && formik.errors.IssueType &&
      <div
      className='text-[#c94e4e] text-[0.75em]'
      >
        {formik.errors.IssueType}
      </div> 
    }
    </li>
    {
      NewSprintIssue ? 
      
      <li className='color-[#00000010] mt-[2em] text-[0.925em]'>
      <label
      className='block mb-[0.2em] text-[0.95em] text-[#505050]'
      >
      <div className='flex items-center'>
        <p className='font-normal'>Sprint</p>
        <p className='text-[#c94e4e] whitespace-pre'> *</p>
      </div>
      </label>


        <div className={`
        flex items-center bg-[#00000010] text-[#505050] 
        p-[0.2em] w-fit hover:cursor-pointer rounded-md`}
        onClick={() => {
          if (ShowSprints) formik.setFieldTouched('sprint', true);
          setShowSprints(!ShowSprints);
        }}
        id='sprint'
        name='sprint'
        onBlur={formik.handleBlur}
        >
          <div>
           {
            formik.values.sprint && formik.values.sprint.length ? 
            formik.values.sprint :
            'Select..'  
          }
          </div>
          <div className='ml-2'>
          <BsChevronDown className={`
          ${ShowSprints ? 'rotate-180' : 'rotate-0'} 
          ease-in-out duration-100`}/>
          </div>
        </div>

      { ShowSprints &&
        <ul className='bg-[#00000010] text-[#505050] 
        w-[7em] rounded-md shadow-md mt-[0.2em]' 
        >
        {
        Sprints.map(
          (sprint, index) => (
          <li 
          key={index} 
          className='rounded-md  w-[7em] p-1 
          hover:cursor-pointer hover:bg-[#00000008]'
          onClick={() => {
            setSelectedSprint(sprint)
            formik.setFieldValue('sprint', sprint.title)
            setShowSprints(false);
          }}
          >
            <div> {sprint.title} </div>
          </li>
          )
        )
        }

        </ul>
      }
      
      
    {
    formik.touched.sprint && formik.errors.sprint &&
      <div
      className='text-[#c94e4e] text-[0.81em] font-light'
      >
        {formik.errors.sprint}
      </div> 
    }
    </li>
      
      : null
    }
    <li className=' mt-[2em] color-[#00000010] font-light'>
      <label
      className='block mb-[0.2em] text-[0.85em] text-[#303030]
      font-normal'
      >
        Assignee
      </label>

  { 
      formik.values.assignTo.length ? 

      <div className='flex items-center text-[#303030]
      bg-[#00000010] w-fit rounded-lg p-1 font-normal text-[0.9em]'
      >
      <div className='mr-2'>{
      formik.values.assignTo[0].firstName + ' ' 
      + formik.values.assignTo[0].lastName
      }</div>
      <button onClick={() => formik.setFieldValue('assignTo', [])}>
        <AiOutlineCloseCircle color='#404040'/>
      </button>
      </div> 
      
      :   

      <>
      <div className='flex items-center'>
  
        <input id='assign' type='text' placeholder='Search users..' 
        className='block bg-[#00000010] lg:w-[20em] md:w-[20em] 
        w-[50vw] rounded-lg outline-none
        p-[0.2em] placeholder:text-[#787878]
        font-normal text-[0.9em] text-[#303030]'
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
          <ul className='bg-[#eaeaea] h-[6em] font-normal text-[0.9em] text-[#303030]
          overflow-y-auto lg:w-[20em] md:w-[20em] w-[50vw]' 
          >
  
        {
        Users
        .filter(// eslint-disable-next-line
          user => {
            const Name = user.firstName + ' ' + user.lastName;
            if (Search==='') 
              return user
            
            else if(
              Name?.toLowerCase().includes(
              Search.toLowerCase()
              )
            ) {
              return user
            }
          }
        
        )
        .map(
          (user, key) =>
          <li key={key}
          className='hover:cursor-pointer flex items-center
          hover:bg-slate-200 rounded-md p-1 space-x-2'
          onClick={
            () => {
              formik.setFieldValue('assignTo', [user]);
              // setSearchbar(false)
              
            }
          }
          >
                      <Avatar className=' antialiased'
            {...stringAvatar(
              user.firstName + ' ' + user.lastName,
              22, 
              22, 
              '0.65em'
              )
            } 
          />
            <div>
              {user.firstName + ' ' + user.lastName}
            </div>


          </li>
          )
  
        }
      </ul>
      }
      
      </>
      }
    

    </li>
    

    <li className='mt-[2em] font-light'>
      <label 
      className='mb-[0.2em] 
      text-[0.95em] text-[#505050]'
      >
        <div className='flex items-center'>
          <p className='font-normal text-[0.875em] text-[#303030]'>Summary</p>
          <p className='text-[#c94e4e]'>*</p>
        </div>
      </label>
      <textarea id='title 'type='text' placeholder='Describe..' 
      className='block bg-[#00000010] lg:w-[20em] md:w-[20em] 
      w-[50vw] rounded-lg outline-none min-h-[2.5em] font-light
      p-[0.2em] overflow-auto placeholder:text-[#787878]'
      name='IssueSummary'
      value={formik.values.IssueSummary}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      >
      </textarea>
      {
      (formik.errors.IssueSummary && formik.touched.IssueSummary) &&
      <div
      className='text-[#c94e4e] text-[0.75em]'
      >
        {formik.errors.IssueSummary}
        </div>
        
        }
      </li>

    </ul>
    </div>

  <div className='text-center mt-[3.25em]'>
  <CustomTooltip title='Cancel' placement='top'>
    <button 
    className='float-left hover:bg-[#e2e2e2] 
    ml-[0.25em] ease-in-out duration-100'
    onClick={() => {
      setIssueModal(false);
      setShowUsers(false);
      setShowTypes(false);
      if (!NewSprintIssue) setSelectedSprint({});
      formik.resetForm();
      setTimeout(
        () => {
          setNewSprintIssue(false);
        }, 1000
      )


    }}
    >
      <AiOutlineClose fontSize={'1.5em'} color='#202020'/>
    </button>
    </CustomTooltip>

  {
    (
    formik.isValid && 
    formik.values.IssueSummary.replace(/\s/g, '').length > 0
    ) &&

    <CustomTooltip title='Submit' placement='top'>
    <button type="submit"
    className='float-right hover:bg-[#e2e2e2] 
    mr-[0.25em] ease-in-out duration-100'
    onClick={
      async () => {
        const isSprintIssue = !isEmpty(SelectedSprint);
        
        const isAssigned = formik.values.assignTo.length 
        const Issue = {
          type: formik.values.IssueType,

          summary: formik.values.IssueSummary,

          assignedTo: isAssigned ? 
          formik.values.assignTo[0]._id : undefined,

          createdBy: user.user,

          project: SelectedProj._id,

          sprint: isSprintIssue ? SelectedSprint._id : undefined,

          stage: isSprintIssue ? 'To Do' : 'backlog' 
        }

        try {
          let response = await axios
                                  .post(
                                  data.Issues + '/add-issue', 
                                  Issue
                                  )
          console.log(response)
          if (response.status === 200) {
  
              if (isSprintIssue) {
                setSprintIssues([...SprintIssues, Issue])
                
              } 
              else setBacklog([...Backlog, Issue])
                
            
              setIssueStatus(200);
              setIssueModal(false);
              formik.resetForm();
          } 
  
          } catch (error) {
            if (error) {
              console.log(error)
              setIssueStatus(error.response.status)
            }
          }
          setIssueModal(false); // double check this
          setShowUsers(false);
          setShowTypes(false);
      }
    }
    >
      <BsCheck2Circle fontSize={'1.5em'} color='#538A58'/>
    </button>

    </CustomTooltip>
    }

  </div>
      
      </>
  )
}

export default IssueForm
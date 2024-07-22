import React, { useEffect, useState } from 'react'
import { TeamContexts } from '../../../contexts/TeamContexts';
import { AiFillLock, AiFillUnlock, AiOutlineClose, AiOutlineUserDelete } from 'react-icons/ai';
import { CustomTooltip } from '../../CustomTooltip';
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { BsCheck2Circle } from 'react-icons/bs';
import { BiHide, BiShow } from 'react-icons/bi';
import axios from 'axios';
import { Switch } from '@headlessui/react';
import { Divider } from '@mui/material';
import { AuthContexts } from '../../../App/Auth';


function EditThisUserForm() {
  const { user, setUser } = AuthContexts()
  const { Users, setEditThisUserModal, EditThisUserModal, setEditThisUserStatus } = TeamContexts();
  function getUser (uID) {
    return Users.filter(u => {
      return u._id === uID
    })[0]
  }

  const SelectedUser = getUser(user.user)
  // console.log(SelectedUser)
  const [ ChangePassword, setChangePassword ] = useState(false);
  const [ DeleteUserConfirm, setDeleteUserConfirm] = useState(false);
  const [ ShowPassword, setShowPassword ] = useState(false);
  const [ ShowConfirmPassword, setShowConfirmPassword ] = useState(false);
  // if true (SwapRole), 
  // then user role is 'admin', 
  // otherwise 'developer'

  const [ SwapRole, setSwapRole ] = useState(false);
  useEffect(() => {
  if (SelectedUser?.role?.toLowerCase() === 'admin') setSwapRole(true); // eslint-disable-next-line
  }, [])


  const formSchema = z.object({
    FirstName:        z.string().min(1, 'Must have at least 1 character'),
    LastName:         z.string().min(1, 'Must have at least 1 character'),
    Email:            z.string().email(),
    Password:         z.string()
                        .min(8,  'Must have at least 8 characters')
                        .max(14, 'Cannot exceed 14 characters')
                        .regex(/(?=.*[A-Z])+/, 'At least one uppercase letter')
                        .regex(/\d/, '          At least one number')
                        .regex(/(?=.*\W)+/,    'At least one special character'),
                        
    ConfirmPassword:  z.string()

  })
  .refine(
    data => data.Password === data.ConfirmPassword, 
    {
        message: 'Passwords do not match' ,
        path: ['ConfirmPassword']
    }
  )


  const { 
    setValue,
    clearErrors,
    reset,
    register, 
    formState: { errors },
    handleSubmit 
  } = useForm({ resolver: zodResolver(formSchema) })


 
useEffect(() => {
setValue('FirstName',       SelectedUser?.firstName)
setValue('LastName',        SelectedUser?.lastName)
setValue('Email',           SelectedUser?.email)
// eslint-disable-next-line
}, [user])   


  
useEffect(() => {
clearErrors(["FirstName", "LastName", "Password"]); 
reset(
  {
    Password: '', 
    ConfirmPassword: '',
    FirstName: SelectedUser?.firstName,
    LastName: SelectedUser?.lastName,
    Email: SelectedUser?.email
  });
// eslint-disable-next-line
}, [EditThisUserModal, ChangePassword] )



const submitData = (data) => { 

  var newDoc =  {
    _id:        SelectedUser?._id,
    firstName:  data.FirstName,
    lastName:   data.LastName,
    email:      data.Email,
    role:       SwapRole ? 'admin' : 'developer',
    password:   data.Password,
  }
    axios.put(
      process.env.REACT_APP_API_Users + '/edit',
      newDoc,
      { withCredentials: true }
    )
    .then(res => {
      console.log(res)
      if ( res.status === 200) {
        setEditThisUserStatus(200);
        setUser({...SelectedUser, ...newDoc})
      }
      else setEditThisUserStatus(500);
    })
    .catch(err => {
      console.log(err);
      setEditThisUserStatus(501);
    })

}







return (
  <>
<form onSubmit={handleSubmit(submitData)}>
  <div className='sticky top-0 bg-inherit'>
  <h1 className='p-3 text-[1.05em] whitespace-pre
  text-[#173e5ed7] font-normal break-words '>
  {
  'Edit your account'
  }
  </h1>
  </div>
  
  <div className='max-h-[20em] overflow-x-hidden overflow-y-auto'> 

  <div className='flex items-center justify-center w-[100%] mt-8'>
  <div> 
  <p
  className='block mb-[0.2em] 
  text-[0.8em] font-bold text-[#303030]'
  >
  First name
  </p>
  <input 
  type='text'
  { ...register("FirstName") }
  className='rounded p-1 bg-[#00000010] outline-none text-[0.9em] w-[14em]'
  > 
  </input>
  { errors.FirstName && 
  <div className=' 
  text-[0.6em] text-[#9e5959]'> 
  { errors.FirstName.message } 
  </div> 
  }

  </div>
  </div>

  <div className='flex items-center justify-center w-[100%] mt-8'>
  <div> 
  <p
  className='block mb-[0.2em] 
  text-[0.8em] font-bold text-[#303030]'
  >
  Last name
  </p>
  <input 
  type='text'
  { ...register("LastName") }
  className='rounded p-1 bg-[#00000010] outline-none text-[0.9em] w-[14em]'
  >
  </input>
  { errors.LastName && 
  <div className='text-[0.6em] text-[#9e5959]'> 
  { errors.LastName.message } 
  </div> 
  }

  </div>
  </div>


  <div className='flex items-center justify-center w-[100%] mt-8'>
  <div>
  <p
  className='block mb-[0.2em] 
  text-[0.8em] font-bold text-[#303030]'
  >
      Email
  </p>
  <input 
  type='email'
  { ...register("Email") }
  className='w-[14em] rounded p-1 bg-[#00000010] outline-none text-[0.9em]'
  >

  </input>
  { errors.Email && 
  <div className='
   text-[0.6em] text-[#9e5959]'> 
  { errors.Email.message } 
  </div> 
  }
  </div>
  </div>

  <div className='flex items-center justify-center w-[100%] mt-8'>
  <div>
  <p
  className='block mb-[0.2em] 
  text-[0.8em] font-bold text-[#303030]'
  >
      Role
  </p>
  <Switch
    checked={SwapRole}
    onChange={setSwapRole}
    className={` relative inline-flex h-11 w-60 items-center rounded-full`}
  >

    <div className='absolute h-10 w-28 hover:bg-[#00000007] p-1 rounded-md'> 
    <div className='flex items-center justify-center mt-[0.1em]'>
    <p className='text-[0.925em]'> 
      Developer
    </p>
    </div>
    </div>

    <div className='absolute h-10 w-28 left-32 hover:bg-[#00000007] p-1 rounded-md'> 
    <div className='flex items-center justify-center mt-[0.1em]'>
    <p className='text-[0.925em]'> 
      Admin
    </p>
    </div>
    </div>
    <span className="sr-only">Enable notifications</span>
    <span
      className={`${
        SwapRole ? 'translate-x-[6.7em]' : 'translate-x-[0]'
      } inline-block h-10 w-28 transform shadow-sm rounded-lg bg-[#00000010] transition`}
    />


  </Switch>
  </div>
  </div>
  {ChangePassword ?  
  <div className='flex items-center justify-center'>
    <Divider sx={{marginTop: 4, width: '55%', justifyContent: 'center' }}/>
  </div> : null}
  <div className='flex items-center justify-center w-[100%] ml-[0.98em]'
  style={{
    marginTop: ChangePassword ? '0.5em' : '1.75em'
  }}>
  <div className=''>
  <button className='w-[12.9em] rounded p-1 mr-[1.9em]'
  onClick={() => setChangePassword(!ChangePassword)}
  >
  <div className='flex rounded p-1 items-center justify-center 
  space-x-3 w-[100%] hover:bg-[#00000010] text-[0.95em]'> 
  <p> 
  {!ChangePassword ?  'Change password' : 'Cancel'}
  </p>
  {!ChangePassword ? <AiFillLock/> : <AiFillUnlock/>}
  </div>
  </button>
  </div>
  </div> 


  {ChangePassword ?
  <> 
  <div className='flex items-center justify-center w-[100%] mt-4 ml-[0.98em] '>
  <div className=''>
  <p
  className='block mb-[0.2em] 
  text-[0.8em] font-bold text-[#303030]'

  >
      Set Password
  </p>
  <div className='w-[100%] flex items-center justify-start'> 
  <input 
  type={ShowPassword ? 'text' : 'password'}
  { ...register("Password") }
  className='flex w-[14em] rounded p-1 bg-[#00000010] outline-none text-[0.9em]'
  >
  </input>
 {
  ShowPassword ?  
  <BiHide className='text-[1.5em] p-1 rounded ml-2  
  hover:bg-slate-200 hover:cursor-pointer'
  onClick={() => setShowPassword(false)}
  /> : 
  <BiShow className='text-[1.5em] p-1 rounded ml-2  
  hover:bg-slate-200 hover:cursor-pointer'
  onClick={() => setShowPassword(true)}
  />
  }
  </div>

  { errors.Password && 
  <div className=' text-[0.6em] text-[#9e5959]'> 
  { errors.Password.message } 
  </div> 
  }
  </div>
  </div>

  <div className='flex items-center justify-center w-[100%] mt-8 ml-[0.98em]'>
  <div>
  <p
  className='block mb-[0.2em] 
  text-[0.8em] font-bold text-[#303030]'

  >
    Confirm Password
  </p>
  <div className='w-[100%] flex items-center justify-start'> 
  <input 
  type={ShowConfirmPassword ? 'text' : 'password'}
  { ...register("ConfirmPassword") }
  className='w-[14em] rounded p-1 bg-[#00000010] outline-none text-[0.9em]'
  >
  </input>
  {
  ShowConfirmPassword ?  
  <BiHide className='text-[1.5em] p-1 rounded ml-2  
  hover:bg-slate-200 hover:cursor-pointer'
  onClick={() => setShowConfirmPassword(false)}
  /> : 
  <BiShow className='text-[1.5em] p-1 rounded ml-2  
  hover:bg-slate-200 hover:cursor-pointer'
  onClick={() => setShowConfirmPassword(true)}
  />
  }
  
  
  </div>
  { errors.ConfirmPassword && 
  <span className='text-[0.6em] text-[#9e5959]'> 
  { errors.ConfirmPassword.message } 
  </span> 
  }



  
  </div>
  </div>
  <div className='flex items-center justify-center'>
  <Divider sx={{marginTop: 2, width: '55%', justifyContent: 'center' }}/>
  </div>
  
  </> : null
  }
  
  
{!DeleteUserConfirm ?
<div className='flex items-center justify-center
  w-[100%] mt-8 ml-[0.98em] text-[#552121]'>
  <div className=''>
  <button className='w-[12.9em] rounded p-1 mr-[1.9em]'
  onClick={() => setDeleteUserConfirm(true)}
  >
  <div className='flex rounded p-1 items-center justify-center 
  space-x-3 w-[100%] hover:bg-[#00000010] text-[0.95em]'> 
  <p> 
  Delete your account
  </p>
  <AiOutlineUserDelete className='text-[1.2em]'/>
  </div>
  </button>
  </div>
  </div> 

  :
  <>

  <div className='flex items-center justify-center
  w-[100%] mt-8 ml-[0.98em] text-[#303030]'>
  <div className=''>
  <button className='w-[12.9em] rounded p-1 mr-[1.9em]'
  >
  <div className='flex rounded p-1 items-center justify-center 
  space-x-3 w-[100%] text-[0.95em]'> 
  <p> 
  {`Are you sure you want to remove ${SelectedUser.firstName + ' ' + SelectedUser.lastName}?`}
  </p>
  </div>
  </button>
  </div>
  </div> 
  
  
  <div className='flex items-center justify-center
  w-[100%] mt-2 ml-[0.98em] text-[#552121]'>
  <div className=''>
  <div className='flex items-center justify-center'>
  <button className='w-[8em] rounded p-1 mr-[1.9em]'
  onClick={() => setDeleteUserConfirm(false)}
  >
  <div className='flex rounded p-1 items-center justify-center 
   w-[100%] hover:bg-[#00000010] text-[0.95em]'> 
  <p> 
  Cancel
  </p>
  </div>
  </button>
  <button className='w-[8em] rounded p-1 mr-[1.9em]'
  onClick={() => {
    // axios request
  }}
  >
  <div className='flex rounded p-1 items-center justify-center 
  w-[100%] hover:bg-[#00000010] text-[0.95em]'> 
  <p> 
  Confirm
  </p>
  </div>
  </button>
  </div>


  </div>
  </div> 
  </>
  }


</div>








   <div className='text-center mt-[3.25em]'>
    <CustomTooltip title='Cancel' placement='top'>
    <button 
    className='float-left hover:bg-[#e2e2e2] 
    rounded-lg ml-[0.25em] ease-in-out duration-100'
    onClick={() => {
      setEditThisUserModal(false);
      setTimeout(() => {
        setChangePassword(false); 
        setDeleteUserConfirm(false);
        }, 
        250);

    }}
    >
    <AiOutlineClose fontSize={'1.75em'} color='#202020'
    className='drop-shadow-sm p-1'
    />
    </button>
    </CustomTooltip>



  <CustomTooltip title='Submit' placement='top'>

  <button type="submit"
  className='float-right hover:bg-[#e2e2e2] 
  rounded-lg mr-[0.25em] ease-in-out duration-100'
  onClick={() => {
    setTimeout(() => {
    setEditThisUserModal(false); 

    }, 750)

    setTimeout(() => {
      setChangePassword(false);
      setDeleteUserConfirm(false);
      }, 1000)
  }
  }
  >
    <BsCheck2Circle fontSize={'1.75em'} color='#538A58' className='drop-shadow-sm p-1'/>
  </button>

  </CustomTooltip>

    </div>
    
    </form>
  </>
)
}

export default EditThisUserForm;
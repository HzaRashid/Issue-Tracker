// eslint-disable-next-line
import React, { useEffect, useState } from 'react'
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
import { BsFillArrowRightCircleFill, BsChevronDown, BsCheck } from 'react-icons/bs';
import { CustomTooltip } from '../../CustomTooltip';
import { ProjTypes } from '../Create/ProjTypes';
import Confirm from '../Create/Confirm';
import stringAvatar from '../../utils/UserAvatar/StringAvatar';
import { Avatar } from '@mui/material';




function ProjForm( { showReview, setShowReview } ) {

    const { Users } = TeamContexts();
    const { setEditProjModal, Projects, 
            SelectedProj,
            EditProj, setEditProj
            } = ProjContexts();

    const [Search, setSearch] = useState('');
    const [showUsers, setShowUsers] = useState(false);
    const [ShowTypes, setShowTypes] = useState(false);

    // useEffect(() => setEditProj(true), []);
    console.log(EditProj)
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

    // console.log(SelectedProj)
    const getTitle = (proj) => proj?.title

    const [ ProjTitle , setProjTitle ] = useState('');
    const [ ProjTeam , setProjTeam ] = useState([]);
    const [ ProjID , setProjID] = useState('');

    const handleProjTitle = e => setProjTitle(e.target.value);

    // function getAssignee (assigneeID) {
    //   const index = Users.map(u => u._id).indexOf(assigneeID);
    //   return Users[index]
    // }
    function getAssignee (assigneeID) {
      const user = Users.filter(u => {
        return u._id === assigneeID
      })[0];
      // console.log(user);
      return user

    }
    useEffect(() => {
      setProjTitle(SelectedProj?.title);
      setProjTeam(SelectedProj
        ?.assignedTo
        ?.map(
          id => getAssignee(id)
          ));
          setProjID(SelectedProj?._id)
    }
    , [SelectedProj, SelectedProj?.title, SelectedProj?.assignedTo])

  return (
<> 
{
  !showReview &&
    <>
    <div className='sticky top-0 bg-inherit'>
    <h1 className='p-3 text-[1.05em] whitespace-pre
      text-[#656565] font-normal break-words '>
        {
          'Edit Project:  ' + 
          SelectedProj?.title?.substring(0,20)
        }
      </h1>
    </div>
      <div className='flex items-center justify-center mt-[1em] font-light'>

      <ul className='h-auto max-h-[55vh] overflow-auto'>

      <li className='mt-[0.65em]'>
      <label 
      className='mb-[0.2em] 
      text-[0.95em] text-[#505050]'
      >
        <div className='flex items-center'>
          <p className='text-[0.8em] font-bold text-[#303030]'>Update Title</p>
          <p className='text-[#c94e4e]'>*</p>
        </div>
      </label>
      <input id='update-title' type='text' placeholder='Project name..' 
      className='block bg-[#00000010] w-auto text-[0.95em]
      max-w-[50vw] rounded-lg outline-none font-normal 
      p-[0.2em] placeholder:text-[#787878]'
      name='ProjTitle'
      value={ProjTitle ? ProjTitle : ''}
      onChange={handleProjTitle}
      >
      </input>

      </li>

    
    <li className=' mt-[2em] color-[#0000001a]'>
    <div
      className='block mb-[0.2em] 
      text-[0.8em] font-bold text-[#303030]'
      >
        Update Team
      </div>
      {

        ProjTeam
        ?.length > 0 &&

      <ul className='inline-block lg:w-[26.5em] md:w-[26.5em] 
      w-[50vw] text-[0.75em] whitespace-nowrap ml-[-0.45em]
          break-normal overflow-x-auto p-1'>
        {

          ProjTeam
          .map(
            (user, key) => {
              // console.log(ProjTeam)
              // const user = Users.filter(u => u._id === userID)[0];
              return (
              
              <li className='inline-block font-normal' key={key}>
                <div className='flex items-center'>
                <div className='flex items-center m-1 p-1 
                bg-[#d5d5d5] rounded-md shadow-sm'>
                  {user.firstName + ' ' + user.lastName}
                  <CustomTooltip title='Remove'>
                  <button 
                  onClick={() => setProjTeam(
                        ProjTeam
                        ?.filter(
                            u => u._id !== user._id
                        ))}
                    >
                  <AiOutlineCloseCircle 
                  className='ml-1 text-[1.1em]' color='#303030'/>
                  </button>
                  </CustomTooltip>
                </div>
                </div>
              </li>
            )}

          )
        }
      </ul>
      }
      
      <div className='flex items-center'>

      <input id='update-team' type='text' placeholder='Search users..' 
      className=' block bg-[#00000010] lg:w-[20em] md:w-[20em] 
      w-[50vw] rounded-lg outline-none font-normal text-[0.95em]
      p-[0.2em] placeholder:text-[#686868] placeholder:font-light'
      value={Search}
      onChange={(e) => setSearch(e.target.value)}
      onClick={() => setShowUsers(true)}
    //   onBlur={formik.handleBlur}
      style={{
        zIndex: 50
      }}
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
    <ul className='bg-[#eaeaea] h-[8em] overflow-y-auto
    lg:w-[20em] md:w-[20em] w-[50vw] shadow' 
    >
    {
      Users
      ?.filter(// eslint-disable-next-line
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
        ProjTeam
          ?.filter(
            u => u._id===user._id
          )
          ?.length > 0 ? 
          'bg-[#dbdbdb]' : 'bg-[#eaeaea] hover:bg-[#dfe7ee] rounded-md'
        } 
          hover:cursor-pointer p-2  first:mt-0
          text-[0.85em] font-normal text-[#505050]
          `}
        
        onClick={() => {
          
          const alreadyUser = ProjTeam
                              ?.filter(
                              u => u._id===user._id
                              );
          
          if (!alreadyUser?.length) {
            if (ProjTeam?.length) {
              setProjTeam(
                [...ProjTeam, user]
                )
            } else setProjTeam( [user])

          } else {

            setProjTeam(
              ProjTeam
              ?.filter(
                u => u._id !== alreadyUser[0]._id
              ))
            }
            // console.log(ProjTeam)
        }
        }
        >
          <div className='flex items-center space-x-2'> 
          <Avatar className=' antialiased'
            {...stringAvatar(
              user.firstName + ' ' + user.lastName,
              22, 
              22, 
              '0.65em'
              )
            } 
          />
          <div className='flex items-center justify-between'>
            {user.firstName + ' ' + user.lastName}
          
          <div className=' ml-[0.5em] mt-[0.15em]'>
          { 
          ProjTeam
          ?.filter(
            u => u._id===user._id
            )
            ?.length > 0 &&
          <BsCheck color='#5B9960' fontSize={'1.15em'}/>
          }
          </div>
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
      className='float-left hover:bg-[#e2e2e2] rounded-lg ml-[0.25em] ease-in-out duration-100'
      onClick={() => {
        setEditProjModal(false);
        setShowUsers(false);
        setEditProj(false);
        // formik.resetForm();
      }}
      >
        <AiOutlineClose fontSize={'1.75em'} color='#202020'
        className='drop-shadow-sm p-1'
        />
      </button>
      </CustomTooltip>

      {

      ProjTitle?.replace(/\s/g, '')?.length > 0 &&

      <CustomTooltip title='Continue' placement='top'>
      <button type="button"
      className='float-right hover:bg-[#e2e2e2] hover:rounded 
      mr-[0.25em] ease-in-out duration-100 p-1 rounded-lg'
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
    setEditProjModal={setEditProjModal}
    Title={ProjTitle}
    Team={ProjTeam}
    Edit={EditProj} 
    setEdit={setEditProj}
    _id={ProjID}
    /> 
    }
      
      </>
  )
}

export default ProjForm
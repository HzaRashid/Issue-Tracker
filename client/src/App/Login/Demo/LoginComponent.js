import React from 'react'
import { OAuthMethods } from './OAuthMethods'
import { Divider } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContexts } from '../../Auth';
import axios from 'axios';

const theme = createTheme({
  components: {
    MuiDivider: {
        styleOverrides: {
            root: {
                '&.MuiDivider-root': {
                  '&::before': {
                    borderColor: '#bebebe'
                  },
                  '&::after': {
                    borderColor: '#bebebe'
                  }}
                }
              }
            }
          }
        });

function LoginComponent() {
    const { setUser, setLoggedInUser, TBDAuthUser } = AuthContexts();

    return (
        <div className='flex items-center justify-center 
        my-[3em] font-lato'
        >
        <div> 
          <div className='w-[28em]'> 
            <h1 className='font-qsand text-[2em] drop-shadow-sm
            text-center font-light tracking-wide text-[#4a4a4a]'> 
            Flow
            </h1>
            <h2
            className='font-qsand text-[1em] mt-2
            text-center font-normal tracking-wide text-[#4a4a4a]'
            >
                Bug-Tracker App Demo
            </h2>
          </div>
    
        <div className='w-[28em] bg-[#e4e4e4] 
        h-[26em] rounded-lg shadow 
        text-[#404040] mx-auto mt-[1.5em]'
        >
        <div> 
          <div >

          </div>

          <div className='flex justify-center mt-[2em] flex-nowrap'> 
          <div className='mt-[2.5em] cursor-pointer'>

                  <div 
                  className='hover:drop-shadow-sm
                  transition ease-in-out delay-50 
                  hover:scale-105 duration-100 rounded-md
                  hover:text-[#799db3] bg-transparent mt-4 ' 
                  onClick={() => {

                    axios.post(
                      process.env.REACT_APP_API_localLogin,
                      {
                        email:      process.env.REACT_APP_API_demoEmail,
                        password:   process.env.REACT_APP_API_demoPwd
                      },
                      { withCredentials: true },
             
                    )
                    .then(res =>{ console.log(res); return res.data})
                    .then(json => { 
                      if (json.authenticated) {
                        setUser({
                          authenticated:  true,
                          user:           json.user._id
                        })
                        setLoggedInUser(json.user);
                      }
                     })
                    .catch(err => {
                      console.log(err);
                      setUser(TBDAuthUser);
                    })
                  }}
                  >
                    <div className='flex justify-start 
                    items-center space-x-2 w-[15em] rounded-2xl 
                    border-[0.05em] border-[#bebebe] p-[0.5em]'>         
                    <div> {OAuthMethods[0].logo} </div>
                    <p className='font-normal text-[1.15em]'>
                    {OAuthMethods[0].name}
                    </p>
           
                    </div>
                  </div>
                
              
          </div>
          </div>
          <div className='mt-12'> 
          <ThemeProvider theme={theme}> 
          <Divider>
          <p className='text-[#555555] font-light'>
            or 
          </p>
          </Divider>
          </ThemeProvider>
          </div>

          <div className='flex justify-center mt-[1.5em]'> 
          <div className='block'> 
          <input 
          id='user-email' 
          name='user-email' 
          placeholder='Email'
          className='block bg-transparent border-b-[0.05em] 
           border-[#909090] w-[20em]
          outline-none font-normal mt-[0.4em] text-[#2a2a2a]
          p-[0.3em] placeholder:text-[#787878]'
          >
    
          </input>
          </div>
          </div>
          
          <div className='flex justify-center mt-[1.25em]'> 
          <div className='block'> 
          {/* <label 
          htmlFor='user-email' 
          className='text-[0.9em] text-[#2a2a2a]
          tracking-[0.025em] font-normal'
          >
            Email
          </label> */}
          <input 
          id='user-password' 
          name='user-password' 
          placeholder='Password'
          className='block bg-transparent border-b-[0.05em] 
           border-[#909090] w-[20em]
          outline-none font-normal mt-[0.4em] text-[#2a2a2a]
          p-[0.3em] placeholder:text-[#787878]'
          >
    
          </input>
          </div>
          </div>

        

          <div className='flex items-center justify-center mt-12'> 

          <div className='flex items-center justify-center 
          p-1 w-[12em] border-[0.05em] border-[#bebebe] hover:cursor-pointer 
          hover:drop-shadow-sm tracking-wide transition rounded-xl
          ease-in-out delay-50 hover:scale-105 duration-100'
          > 
          <button>
            <p className='font-normal text-[1.1em]'> 
            Continue 
            </p>
          </button>
          </div>
          </div>
          

          </div>
        </div>
        </div>
        </div>
    
      )
}

export default LoginComponent
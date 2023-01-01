import React from 'react'
import { OAuthMethods } from './OAuthMethods'
import { Divider } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';


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

    return (
        <div className='flex items-center justify-center 
        my-[4em] font-lato'
        >
        <div> 
          <div className='w-[28em]'> 
            <h1 className='font-qsand text-[2em] drop-shadow-sm
            text-center font-light tracking-wide text-[#4a4a4a]'> 
            Flow
            </h1>
          </div>
    
        <div className='w-[28em] bg-[#e4e4e4] 
        h-[28em] rounded-lg shadow 
        text-[#404040] mx-auto mt-[1.5em]'
        >
        <div> 
          <div >
          <div className='flex justify-center mt-[2em] flex-nowrap'> 
          <div className='mt-[2.5em] cursor-pointer'>
            {
              OAuthMethods.map(
                (item, key) => (
                  <div key={key}
                  className='hover:drop-shadow-sm
                  transition ease-in-out delay-50 
                  hover:scale-105 duration-100 rounded-md
                  hover:text-[#799db3] bg-transparent first:mt-0 mt-4 ' 
                  onClick={item.onClick}
                  >
                    <div className='flex justify-start 
                    items-center space-x-2 w-[15em] rounded-2xl 
                    border-[0.05em] border-[#bebebe] p-[0.5em]'>         
                    <div> {item.logo} </div>
                    <p className='font-light text-[1.15em]'>
                    {item.name}
                    </p>
           
                    </div>
                  </div>
                )
              )
            }
          </div>
          </div>

          <div className='mt-4'> 
          <ThemeProvider theme={theme}> 
          <Divider>
          <p className='text-[#555555] font-light'>
            or 
          </p>
          </Divider>
          </ThemeProvider>


          
          </div>
          </div>

          <div className='flex justify-center mt-[1em]'> 
          <div className='block'> 
          <label 
          htmlFor='user-email' 
          className='text-[0.9em] text-[#2a2a2a]
          tracking-[0.025em] font-normal'
          >
            Email
          </label>
          <input 
          id='user-email' 
          name='user-email' 
          className='block bg-transparent border-b-[0.05em] 
           border-[#909090] w-[20em]
          outline-none font-normal mt-[0.4em] text-[#2a2a2a]
          p-[0.3em] placeholder:text-[#787878]'
          >
    
          </input>
          </div>
          </div>

          <div className='flex items-center justify-center mt-8'> 

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
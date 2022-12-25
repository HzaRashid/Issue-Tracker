import React from 'react'
import { OAuthMethods } from './OAuthMethods'

function Login() {
  
  return (
    <div className='flex items-center justify-center 
    my-[4em] font-lato'
    >
    <div> 
      <div className='w-[28em]'> 
        <h1 className='font-qsand text-[2em] 
        text-center font-light tracking-wide text-[#4a4a4a]'> 
        Flow
        </h1>
      </div>

    <div className='w-[28em] bg-[#e4e4e4] 
    h-[25em] rounded-lg shadow 
    text-[#404040] mx-auto mt-[2.5em]'
    >
      <p className='text-[1.5em] font-lato 
      tracking-wide text-center pt-6 font-light'>
        Login
      </p>

      <div className='flex justify-center mt-8 flex-nowrap'> 
      <ul className='block'> 
      <div className='block'> 
      <label 
      htmlFor='user-email' 
      className='text-[0.9em] text-[#2a2a2a]
      tracking-[0.025em] font-light'
      >
        Email
      </label>
      <input 
      id='user-email' 
      name='user-email' 
      className='block bg-[#00000010] w-[20em]
       rounded-lg outline-none font-light mt-0.5
       p-[0.3em] placeholder:text-[#787878]'
      >

      </input>
      </div>

      <div className='block mt-6'> 
      <label 
      htmlFor='user-pswd' 
      className='text-[0.9em] text-[#2a2a2a]
       tracking-[0.025em] font-light'
      >
        Password
      </label>
      <input 
      id='user-pswd' 
      name='user-pswd' 
      className='block bg-[#00000010] w-[20em]
       rounded-lg outline-none font-light mt-0.5
      p-[0.3em] placeholder:text-[#787878]'
      >

      </input>
      </div>

      <div className='mt-8 font-light text-center'>
        <p>Sign in with</p>
      </div>
      <div className='mt-1.5 flex justify-center 
      space-x-2 cursor-pointer'>
        {
          OAuthMethods.map(
            (item, key) => (
              <div key={key}
              className='hover:drop-shadow-sm
              transition ease-in-out delay-50 
              hover:scale-105 duration-100 
              hover:text-[#799db3]' 
              onClick={item.onClick}
              >
                {item.logo}
              </div>
            )
          )
        }
      </div>
      </ul>
      </div>
    </div>
    </div>
    </div>
  )
}

export default Login
import React, { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { ProjContexts } from '../../../contexts/ProjectContexts'
import ProjectList from './ProjectList';

function Header( { isMobile } ) {
    const { Projects } = ProjContexts();
    const [search, setSearch] = useState('');
    const handleSearch = e => setSearch(e.target.value)


  return (
    <> 
    <div className='font-lato' 
    style={{
      height: isMobile ? '2em' : '',
      marginBottom: isMobile ? '18em' : '7.4em',
      marginRight: isMobile ? '10vw' : ''
    }}
    >
    <p className='text-[1.4em] font-bold antialiased text-[#252525] mb-1'>
        Projects
    </p>
    <div className='flex items-center bg-stone-200
        border-b-[0.01em] border-[#dbdbdb] hover:bg-[#dbe4eb]
        w-[18em] rounded-lg text-[1.05em] hover:cursor-text mb-[0.45em] '
        style={{
          width: isMobile ? '50vw' : '18em',
          marginRight: isMobile ? '4em' : '',

        }}
        >
        <AiOutlineSearch className='mr-1 ml-[0.4em] rotate-90' color='#929292'/>
        <input 
        id="search-proj-home"
        type='text'
        className='bg-transparent outline-none p-[0.1em] font-light'
        placeholder='Search..'
        value={search}
        onChange={handleSearch}
        />  
        </div>

        <ProjectList search={search} Projects={Projects} isMobile={isMobile}/>
        </div>
    </>
  )
}

export default Header
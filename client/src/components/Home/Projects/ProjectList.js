import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function ProjectList( { search, Projects, isMobile } ) {
    let goToPage = useNavigate();

    const SearchResults = Projects.filter(
        // eslint-disable-next-line
        p => 
        {
            if (search === '') return p
            else if (
            p.title?.toLowerCase()
            .includes(search.toLowerCase()) 
            ) { return p }
        }
    )


    const [mounted, setMounted] = useState(false);
    useEffect(() =>{ 
        setTimeout(() => setMounted(true), 100);
        return () => {}
    }, []);


    const delay = 500;
  return (
    <div className='absolute mt-[0.25em] '
    style={{
        width: !!isMobile ? '50vw' : '18.9em',
      }}
    >
        <ul className=' max-h-[7.4em] overflow-auto delay-200'>
        {
            SearchResults?.map((p, key) =>
                <li key={key}
                id={key}
                className='p-[0.3em] first:mt-0 mt-[0.5em]
                 bg-[#eaeaea] rounded-xl hover:cursor-pointer
                 hover:bg-[#dbe4eb]'
                style={{
                    visibility: mounted ? 'visible' : 'hidden',
                    opacity:    mounted ? '1'       : '0',
                    transition: 'visibility 1s, opacity 1s ',
                    animationDelay: `${key*delay + 1}ms`,
                    transitionDelay: `${key*delay + 1}ms`
                
                }}
                onClick={() => { goToPage(`/project-page/${p?.title}/backlog/`)}}
                >
                    {p?.title}
                </li>
                )
        }
        </ul>
    </div>
  )
}

export default ProjectList
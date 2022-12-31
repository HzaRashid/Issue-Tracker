import TeamTable from '../components/Team/TeamTable';
import { useStateContext } from '../contexts/ContextProvider';
import { useLocation } from 'react-router-dom';

function Team() {
  const { nav, ProjectNav } = useStateContext();
  const currLoc = useLocation();

  return (
    <>
    <div 
    className={`
    ${
      nav ? 'ml-[12rem]' : 'ml-[4.25rem]'
  } 
  body-font font-lato ease-in-out duration-[.3s] w-[10]`
  }
    >

<div className={`
        ${
          ProjectNav ? 
          'ml-[12rem]' : 'ml-[0]'
        }
        ease-in-out duration-[0.2s] `
          }
        >

    <div className='fixed mt-[1rem] ml-[2rem] text-[1.2rem] text-[#4e779f]'>
    <button className='font-light'>
    {currLoc.pathname}
    </button>
    </div>
    <TeamTable/>
    </div>
    </div>
    
    
    </>

  );
}

export default Team;
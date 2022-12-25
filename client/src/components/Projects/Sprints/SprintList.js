// eslint-disable-next-line
import React, { useEffect, useState } from 'react'
import { SprintContexts } from '../../../contexts/SprintContexts';
import SprintTable from './SprintTable';
import { AiOutlineSearch, AiOutlinePlusCircle } from 'react-icons/ai'
import { FiChevronDown } from 'react-icons/fi'
import { CustomTooltip } from '../../CustomTooltip';
import { isEmpty } from '../../utils/isEmptyObject';
import { useStateContext } from '../../../contexts/ContextProvider';


function SprintList( props ) {

    const { id, items } = props

    const { 
        Sprints, 
        SelectedSprint, setSelectedSprint,
        setSprintModal,
    } = SprintContexts();
    
    const { nav, ProjectNav, ScreenWidth } = useStateContext();

    const [Search, setSearch] = useState('');
    const handleSearch = e => setSearch(e.target.value)

    const [ShowSprint, setShowSprint] = useState(false);


    var searchResults = Sprints.filter(
        // eslint-disable-next-line
        sprint => 
        {
            if (Search === '') return sprint

            else if (
            sprint.title.toLowerCase()
            .includes(Search.toLowerCase()) 
            ) { return sprint }
        }
    )
    
  return (
    <div className='flex body-font font-[Open Sans] font-light subpixel-antialiased'>
      
      <div className='mt-[1.8em] ml-auto mr-auto'
        style={{
            width: !nav && !ProjectNav ? '70vw' : (nav && ProjectNav && ScreenWidth<1024) ? '42.5vw' : '60vw',
            transition: '0.3s',
            }}
      >

        <div className='lg:flex md:flex items-center'
        style={{
            display: ScreenWidth < 1024 ? 'block' : 'flex'
        }}
        > 
        <p
        className='mb-2 lg:text-[1.55em] md:text-[1.3em] sm:text-[1.3em] 
        text-[1.3em] bg-inherit drop-shadow-sm'
        >
            Sprints
        </p>

        <div className='flex items-center
        border-b-[0.01em] border-[#dbdbdb]
        lg:ml-[2em] md:ml-[2em] ml-1 lg:w-[fit] 
        md:w-[fit] w-[12em] bg-inherit mb-[0.35em]
        text-[1.1em]'
        style={{
            marginLeft: ScreenWidth < 1024 ? '0' : '1.5em'
        }}
        >
        <AiOutlineSearch className='mr-1 rotate-90' color='#929292'/>
        <input 
        type='text'
        className='bg-transparent outline-none p-[0.1em] font-light'
        placeholder='Search..'
        value={Search}
        onChange={handleSearch}
        />  
        </div>
        <CustomTooltip title='Create Sprint' sx={{ zIndex: 0 }}>
        <button className='flex items-center lg:ml-[2em] md:ml-[2em] ml-1 
        mb-[0.35em] hover:cursor-pointer bg-neutral-200 font-light
         p-[0.4em] rounded-lg hover:shadow-md text-[#505050]'
         style={{
            marginLeft: ScreenWidth < 1024 ? '0' : '1em'
        }}
         onClick={() => setSprintModal(true)}

         > 
         <AiOutlinePlusCircle className='mr-1' color='#505050'/>
        Create
        </button>
        </CustomTooltip>

        </div>
        <ul className='h-[auto] max-h-[8em] overflow-auto'>
            {
                searchResults
                .map(
                    (sprint, key) => (
                        <li key={key} 
                        className='border-b-[0.01em] 
                        p-2 border-[#c2c2c2] hover:shadow hover:rounded-lg' 
                        style={{
                            width: !nav && !ProjectNav ? '70vw' : (nav && ProjectNav && ScreenWidth<1024) ? '42.5vw' : '60vw',
                            height: 'auto',
                            maxHeight: SelectedSprint?._id === sprint?._id ? '12em' : '3em',
                            overflow: 'auto',
                            marginBottom:  ShowSprint && SelectedSprint?._id === sprint?._id ? '1em' : '0em',
                            transition: 'all 0.2s ease-in-out',
                            transitionDelay: '0.01s'

                            }}
                        onClick={
                            () => {
                                if (SelectedSprint._id !== sprint._id ) {
                                    setSelectedSprint(sprint)
                                    setShowSprint(true)
                                    // console.log('OPEN: ' + ShowSprint)
                                } else if (!isEmpty(SelectedSprint) && !ShowSprint) {
                                    setShowSprint(true)
                                }
                                else {
                                    setSelectedSprint({})
                                    setShowSprint(false)
                                    // console.log('CLOSE: ' + ShowSprint)
                                }
                                
                                // console.log(SelectedSprint)
                            }}
                        >
                            <div className='flex items-center hover:cursor-pointer text-[1.1em]'>
                            <div>{sprint.title}</div>
                            <div className={
                                `${
                                    !isEmpty(SelectedSprint) && 
                                    SelectedSprint?._id === sprint?._id &&
                                    ShowSprint ? 
                                'rotate-180' : 'rotate-0'} ml-2 ease-in-out duration-100`}> 
                                    <FiChevronDown/>
                            </div>
                            </div>
                            {
                                !isEmpty(SelectedSprint) && 
                                SelectedSprint?._id === sprint?._id &&
                                ShowSprint &&
                                <SprintTable id={id} items={items} sprint={sprint}/>
                            }
                        </li>
                    )
                )
            }

        </ul>
      </div>
     </div>
  )
}

export default SprintList
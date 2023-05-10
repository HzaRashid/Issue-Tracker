// eslint-disable-next-line
import React, { useState } from 'react'
import { SprintContexts } from '../../../contexts/SprintContexts';
import SprintTable from './SprintTable';
import { AiOutlineSearch, AiOutlinePlusCircle } from 'react-icons/ai'
import { CustomTooltip } from '../../CustomTooltip';
import { isEmpty } from '../../utils/isEmptyObject';
import { useStateContext } from '../../../contexts/ContextProvider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { styled } from '@mui/material/styles';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }));
  
  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ExpandMoreIcon sx={{ fontSize: '0.9rem' }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  }));
  
  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));

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
    // setSelectedSprint({});


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

      const [expanded, setExpanded] = React.useState(false);

      const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };
    
  return (
    <div className='flex body-font font-[Open Sans] font-light subpixel-antialiased'>
      
      <div className='mt-[1.8em] ml-auto mr-auto'
        style={{
            width: !nav && !ProjectNav ? '70vw' : 
            (nav && ProjectNav && ScreenWidth<1024) ? '42.5vw' : '60vw',
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
        <ul className='h-[auto] max-h-[10em] overflow-auto transition-all'>
        
            {
                searchResults
                .map(
                    (sprint, key) => (
                        <Accordion 
                        expanded={expanded === key} 
                        onChange={handleChange(key)}
                        sx={{bgcolor: "#f0f0f0", border:"transparent"}}
                        key={key}
                        > 
                       <AccordionSummary key={key} 
                        className='flex border-b-[0.01em] hover:bg-slate-200
                        p-2  hover:shadow-md hover:rounded-lg' 
                        sx={{bgcolor: "#f0f0f0", border:"transparent"}}
                        expandIcon={<ExpandMoreIcon />}
    
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
                                }
                            }}
                        >

                            <div>{sprint.title}</div>

                            </AccordionSummary>

                            <AccordionDetails> 
                             {
                                SelectedSprint?._id === sprint?._id &&
                                ShowSprint &&
                                <SprintTable id={id} items={items} sprint={sprint}/>   
                            } 
                            </AccordionDetails>
                        
                        </Accordion>
                    )
                )
            }
        
        </ul>
      </div>
     </div>
  )
}

export default SprintList
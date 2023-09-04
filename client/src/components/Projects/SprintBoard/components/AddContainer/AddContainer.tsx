import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import { SprintContexts } from '../../../../../contexts/SprintContexts';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';


export interface Props {
  children: React.ReactNode;
  columns?: number;
  label?: string;
  style?: React.CSSProperties;
  horizontal?: boolean;
  handleProps?: React.HTMLAttributes<any>;
  scrollable?: boolean;
  shadow?: boolean;
  placeholder?: boolean;
  unstyled?: boolean;
  addStage?: boolean
  setAddStage?: React.Dispatch<SetStateAction<boolean>>,
}

const stopDrag = (e: any) => {
  e.stopPropagation();
  document.body.style.setProperty('cursor', '')
  // console.log('clsoed')
}

type Sprint = Record<string, any>;



export function AddContainer(
  
    {
      children,
      columns = 1,
      handleProps,
      horizontal,
      label,
      placeholder,
      style,
      scrollable,
      shadow,
      unstyled,
      addStage,
      setAddStage,
      ...props
    }: Props
    ) {
    const { 
      SelectedSprint, 
      setSelectedSprint,
      setAddedStage
    } = SprintContexts();


    // const [showSubmitBtns, setShowSubmitBtns] = useState<boolean>(false);
    const [StageTitle, setStageTitle] = useState<string>('');
    const inputRef = useRef<HTMLElement>(null)
    // @ts-ignore
    const FocusOut = () => inputRef.current.blur()
    const FocusIn = () => inputRef.current?.focus()

    const handleClose = (e: any) => {
      stopDrag(e)
      
      if (StageTitle) {  //@ts-ignore
        setTimeout(() => { setAddStage(false) }, 30)
        FocusOut();
        return;
      }
      //@ts-ignore
      setAddStage(false);
      FocusOut();
    }

    const handleSubmit = (e: any) => {
      console.log('clicked') // @ts-ignore
              
      if (
        StageTitle && 
        StageTitle.replace(/\s/g, '').length > 0
        ) {
          console.log(StageTitle)
          const sprintUrl : string = process.env.REACT_APP_API_Sprints as string
          axios.put(
            sprintUrl + '/add-stage',
            {
              sprintID: SelectedSprint?._id,
              stageTitle: StageTitle
            },
            { withCredentials: true }
          )
          .then(res => {
            console.log(res);
            if (res.status === 200) {
              setSelectedSprint((sprint: Sprint) => {
                const stages = sprint.stages;
                stages.push({
                  title: StageTitle,
                  issue_limit: null
                })
                return {...sprint, stages: stages}
              })

              setAddedStage(true)
              
            }
          })
          .catch(err => {
            console.log(err);
            setStageTitle('')
            FocusIn();

          })}

          handleClose(e)

    }

    
    const scrollRef = useRef<HTMLDivElement>(null);
    // const scroll = () => scrollRef.current?.scrollIntoView()

    useEffect(
      () => {
        if (scrollRef?.current) {
          scrollRef.current?.scrollIntoView({behavior: 'smooth'})
        }
      },
      [scrollRef]
    )



    return (
      
      <div
        // @ts-ignore
        ref={scrollRef}
        className='mx-2 bg-[#e4e4e4] mt-1
        rounded-md text-[#505050] font-lato 
        font-normal shadow-sm p-1  min-w-[16em] 
        h-auto  max-h-[16em]'
        id='add-stage'
        // onBlur={handleClose}
      >

        <> 

        <div className='flex items-center bg-[#e4e4e4]
          justify-between pt-1 pb-1.5 sticky top-0 z-10'
          >

            <h1 className='text-[0.85em] 
            text-[#505050] ml-[0.5em] pt-1' 
            onMouseDown={stopDrag}
            onPointerDown={stopDrag}
            onKeyDown={stopDrag}
            onTouchStart={stopDrag}
            onClick={stopDrag}
            // onBlur={handleClose}
            >
              <input 
              autoFocus
              placeholder={'Stage title..'} 
              className='bg-transparent p-1 
              outline-none hover:bg-[#0000001a] 
              placeholder:text-[#707070]
               rounded-md focus:bg-[#e5e5e5]
              focus:placeholder:text-[#707070]'
              //@ts-ignore
              ref={inputRef}
              // onBlur={handleClose}
              onChange={e => {setStageTitle(e.target.value); console.log(StageTitle)}}
              value={StageTitle}
              />
            </h1>

            <div className='flex items-center z-100 mr-2' 
            onMouseDown={stopDrag}
            onPointerDown={stopDrag}
            onKeyDown={stopDrag}
            onTouchStart={stopDrag}
            onClick={stopDrag}
            >
            {/* CANCEL NEW STAGE */}
            <div 
            className='bg-[#e5e5e5] hover:bg-[#e0e0e0] 
            p-1 rounded-md shadow cursor-pointer' 
            onClick={handleClose}
            > 
            <AiOutlineClose color='#b65454' fontSize={'1.2em'}/>
            </div>

            {/* CONFIRM NEW STAGE */}
            <div className='bg-[#e5e5e5] hover:bg-[#e0e0e0] 
            p-1 rounded-md shadow ml-1 cursor-pointer'
            // key={'confirm'}
            // onMouseDown={stopDrag}
            // onPointerDown={stopDrag}
            // onKeyDown={stopDrag}
            // onTouchStart={stopDrag}
            // onClick={stopDrag}
            onClick={handleSubmit}
            > 
            <AiOutlineCheck color='#65A766' fontSize={'1.2em'}/>
            </div>
            </div> 
            
          </div> 
          {/* {console.log(SelectedSprint)} */}
          </>
      </div>
    );
};

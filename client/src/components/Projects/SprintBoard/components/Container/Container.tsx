import React, { forwardRef, useEffect, useRef, useState } from 'react';
// import classNames from 'classnames';
import { SprintContexts } from '../../../../../contexts/SprintContexts';
import { CustomTooltip } from '../../../../CustomTooltip';
// import {Handle, Remove} from '../Item';

// import styles from './Container.module.css'
import { BsThreeDotsVertical } from 'react-icons/bs';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';
import { BiListMinus } from 'react-icons/bi';



export interface Props {
  children: React.ReactNode;
  columns?: number;
  label?: string;
  style?: React.CSSProperties;
  horizontal?: boolean;
  hover?: boolean;
  handleProps?: React.HTMLAttributes<any>;
  scrollable?: boolean;
  shadow?: boolean;
  placeholder?: boolean;
  unstyled?: boolean;
  onClick?(): void;
  onRemove?(): void;
  // Stage?: ({title: string, issue_limit: number | null} | null)
  size?: number | null,
  isSorting?: boolean,
  addStage?: boolean

}

type Sprint = Record<string, any>;
type Stage = {title: string, issue_limit: number | null}

const stopDrag = (e: any) => {
  e.stopPropagation();
  document.body.style.setProperty('cursor', '')
}


export const Container = forwardRef<HTMLDivElement, Props>(
  (
    {
      children,
      columns = 1,
      handleProps,
      horizontal,
      hover,
      onClick,
      onRemove,
      label,
      placeholder,
      style,
      scrollable,
      shadow,
      unstyled,
      // Stage,
      isSorting,
      size,
      addStage,
      
      ...props
    }: Props,
    ref
  ) => {

    const { 
      editStage, setEditStage, 
      SelectedStage, setSelectedStage,
      setOpenDeleteStage,
      setOpenIssuesLimit,
      SelectedSprint, setSelectedSprint,
      items,
    } = SprintContexts();


    // const Component = onClick ? 'button' : 'div';

    const editStageOptions = [
      {
        title: 'Issues Limit',
        handler: () => setOpenIssuesLimit(true)
      }, 
      {
        title: 'Delete',
        handler: () => setOpenDeleteStage(true)
      }
    ]

   
    const [Stage, setStage] = useState<Stage | null>(null);
    useEffect(
      () => {
        if (SelectedSprint?.stages && label) {
          setStage(
            SelectedSprint.stages.filter((stage: Stage) =>
              stage.title === label
            )[0] 
        )
      }
    }, [SelectedSprint, label]
    )
    // console.log(Stage)

    const [showSubmitBtns, setShowSubmitBtns] = useState<boolean>(false);
    const [updateTitle, setUpdateTitle] = useState<string | null>(null);
    const inputRef = useRef<HTMLElement>(null)
    // @ts-ignore
    const FocusOut = () => inputRef.current.blur()
    const FocusIn = () => inputRef.current?.focus()
    const handleInputOpen = () => {
      setShowSubmitBtns(true) 
      setSelectedStage(Stage)
      setEditStage(false)
    }
    const handleInputClose = (e: any) => {
      stopDrag(e)
      setShowSubmitBtns(false) 
      setSelectedStage({})
      
      FocusOut();
    }
    //@ts-ignore
    // console.log(size)
    // console.log(isSorting)

    return (
      <div
        {...props}
        // @ts-ignore
        ref={ref}
        
        style={
          {
            ...style,
            '--columns': columns,
          } as React.CSSProperties
        }
        
        className={
          `mx-2 bg-[#e4e4e4] p-1 mt-1
          rounded-md text-[#505050] font-lato 
          font-normal shadow-sm   min-w-[16em] 
          h-auto  max-h-[50vh] `
          }

        onClick={onClick}
        // tabIndex={onClick ? 0 : undefined}
        {...handleProps}
      >
        {label ?
        <> 

        <div className='flex items-center bg-[#e4e4e4]
          justify-between pt-1 pb-1.5 sticky top-0 z-10'
          >

            <h1 className='text-[0.85em] 
            text-[#505050] ml-[0.5em] pt-1 w-[11em]' 
            onMouseDown={stopDrag}
            onPointerDown={stopDrag}
            onKeyDown={stopDrag}
            onTouchStart={stopDrag}
            onClick={stopDrag}
            >
              <input 
              placeholder={label.toUpperCase()} 
              className='bg-transparent p-1 
              outline-none hover:bg-[#0000001a] 
              placeholder:text-[#707070]
               rounded-md focus:bg-[#e5e5e5]
              focus:placeholder:text-[#707070] w-[11em]'
              onClick={handleInputOpen} 
              //@ts-ignore
              ref={inputRef}
              onBlur={handleInputClose}
              onChange={e => setUpdateTitle(e.target.value)}
              value={updateTitle ? `${updateTitle}` : ''}
              />
            </h1>

            {/* {size && Stage?.issue_limit && 
            size > Stage?.issue_limit &&
            !showSubmitBtns ?  */}

              
              <CustomTooltip 
              title={!isSorting ? `Issue Limit Exceeded (${Stage?.issue_limit})` : ''}
              placement='top'
              arrow
              > 
              <div className='flex items-center p-1 
              rounded-md hover:bg-[#00000008] absolute ml-[10em]'
              style={{
                visibility: size && Stage?.issue_limit && 
                size > Stage?.issue_limit &&
                !showSubmitBtns ? 'visible' : 'hidden',
                opacity: size && Stage?.issue_limit && 
                size > Stage?.issue_limit &&
                !showSubmitBtns ? '100' : '0',
                transition: 'all 0.15s'}}
              >
                <BiListMinus fontSize={'1.6em'} color='#A75050'/>
              </div> 
              </CustomTooltip>

              {/* : null} */}



            <div className='flex items-center z-10' 
            style={{
            visibility: label === SelectedStage?.title && showSubmitBtns ? 'visible' : 'hidden',
            opacity: label === SelectedStage?.title && showSubmitBtns ? '100' : '0',
            transition: 'visibility 0.1s, opacity 0.1s',
            }}
            onMouseDown={stopDrag}
            onPointerDown={stopDrag}
            onKeyDown={stopDrag}
            onTouchStart={stopDrag}
            onClick={stopDrag}
            >
            {/* CLOSE INPUT */}
            <div 
            className='bg-[#e5e5e5] hover:bg-[#e0e0e0] 
            p-1 rounded-md shadow' 
            onClick={handleInputClose}
            > 
            <AiOutlineClose color='#b65454' fontSize={'1.2em'}/>
            </div>

            {/* SUBMIT INPUT */}
            <div className='bg-[#e5e5e5] hover:bg-[#e0e0e0] 
            p-1 rounded-md shadow ml-1'
            onClick={() => {

              // console.log('clicked')
              if (
                updateTitle && 
                updateTitle.replace(/\s/g, '').length > 0
                ) {
                const issueIDs = items[label]?.map(
                  (issue: {_id: string}) => issue._id
                )
                // console.log(issueIDs)
                // console.log(updateTitle)
                axios.put(
                  process.env.REACT_APP_API_Sprints + '/update-stage-title',
                  {
                    sprintID: SelectedSprint?._id,
                    oldStageTitle: label,
                    newStageTitle: updateTitle,
                    issues: issueIDs

                  }, 
                  { withCredentials: true })
                  .then(
                    res => {
                      console.log(res)
                      if (res.status === 200) {
                        setSelectedSprint(
                          (prevState: Sprint) => ({
                            ...prevState,
                            stages: prevState.stages?.map(
                              (stage: Stage) => {
                                if (stage.title.toLowerCase() === label.toLowerCase()) {
                                  return {...stage, title: updateTitle}
                                }
                                return stage
                              })
                          })
                        )
                        return;
                        }}
                  )
                  .catch(err => {
                    console.log(err)
                    setUpdateTitle(null)
                    handleInputOpen()
                    FocusIn();
                  })

                  return;
                } 
            }}

            > 
            <AiOutlineCheck color='#65A766' fontSize={'1.2em'}/>
            </div>
            </div> 
            

          <CustomTooltip 
          title={'Edit Stage'}
          placement='right'
          arrow
          > 
          <div 
          className={`
          ${label === SelectedStage?.title && editStage ? 'bg-[#395069c7]' : 'hover:bg-[#00000010]'}
          hover:cursor-pointer rounded-sm
          p-1 drop-shadow-sm mr-[0.1em]`}
          onMouseDown={stopDrag}
          onPointerDown={stopDrag}
          onKeyDown={stopDrag}
          onTouchStart={stopDrag}
          onClick={
            (e) => {
              stopDrag(e);
              if (editStage && SelectedStage?.title!==label) {
                setSelectedStage(Stage)
                return
              }
              setEditStage(true)
              setSelectedStage(Stage)
            }}
            style={{
              transition: 'all 0.1s ease-in-out'
            }}
          >
          <BsThreeDotsVertical color={label === SelectedStage?.title && editStage ? '#e4e4e4' : '#404040'}
          style={{
            transition: 'all 0.1s ease-in-out'
          }}
          />
          </div>
          </CustomTooltip>
          {
          label === SelectedStage?.title && editStage &&
          <div className='shadow-md absolute inline-block rounded-md w-[7em]
          hover:cursor-pointer bg-[#ededed] ml-[8.25em] mt-[6em] z-15 overflow-auto'
          onMouseDown={stopDrag}
          onPointerDown={stopDrag}
          onTouchStart={stopDrag}
          onClick={stopDrag}
          >
            {
              editStageOptions.map(
                (option, key) => (
                  <div 
                  key={key} 
                  className='hover:bg-[#98c9e521] p-[0.2em]'
                  onClick={(e) => {
                    stopDrag(e)
                    option.handler()
                  }}
                  >
                  <p className='ml-1 text-[0.95em]'> {option.title}</p>
                  </div>
                )
              )
            }
            </div>
            
          }
          </div> 
          </>

          : null}


        {placeholder ? children : <div className='pt-1.5'>{children}</div>}
      </div>
    );
  }
);
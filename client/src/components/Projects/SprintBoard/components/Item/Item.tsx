import React, {useEffect, useState} from 'react';
// import classNames from 'classnames';
import type {DraggableSyntheticListeners} from '@dnd-kit/core';
import type {Transform} from '@dnd-kit/utilities';
import { CustomTooltip } from '../../../../CustomTooltip';
import { MdError } from 'react-icons/md';
import { AiFillCheckSquare, AiFillTool } from 'react-icons/ai';
import { IssueContexts } from '../../../../../contexts/IssueContexts';
import { isEmpty } from '../../../../utils/isEmptyObject';

// import {Handle, Remove} from './components';

// import styles from './Item.module.css';

export interface Props {
  dragOverlay?: boolean;
  color?: string;
  disabled?: boolean;
  dragging?: boolean;
  handle?: boolean;
  height?: number;
  index?: number;
  fadeIn?: boolean;
  transform?: Transform | null;
  listeners?: DraggableSyntheticListeners;
  sorting?: boolean;
  style?: React.CSSProperties;
  transition?: string | null;
  wrapperStyle?: React.CSSProperties;
  value: {summary: string, _id: string, type: string};
  onRemove?(): void;
  renderItem?(args: {
    dragOverlay: boolean;
    dragging: boolean;
    sorting: boolean;
    index: number | undefined;
    fadeIn: boolean;
    listeners: DraggableSyntheticListeners;
    ref: React.Ref<HTMLElement>;
    style: React.CSSProperties | undefined;
    transform: Props['transform'];
    transition: Props['transition'];
    value: Props['value'];
  }): React.ReactElement;
}

export const Item = React.memo(
  React.forwardRef<HTMLLIElement, Props>(
    (
      {
        color,
        dragOverlay,
        dragging,
        disabled,
        fadeIn,
        handle,
        height,
        index,
        listeners,
        onRemove,
        renderItem,
        sorting,
        style,
        transition,
        transform,
        value,
        wrapperStyle,
        ...props
      },
      ref
    ) => {
      useEffect(() => {
        if (!dragOverlay) {
          return;
        }
        document.body.style.cursor = 'grabbing';

        return () => {
          document.body.style.cursor = '';
        };
      }, [dragOverlay]);

      type Issue = Record<string, any>
      const { setEditIssueModal, SelectedIssue, setSelectedIssue } = IssueContexts()
      const [issueItem, setIssueItem] = useState<Issue | null>(value);
      useEffect(() => {
        if (
          SelectedIssue && 
          !isEmpty(SelectedIssue) &&
          value._id === SelectedIssue._id
         ) {
          setIssueItem(SelectedIssue)
        }
         // eslint-disable-next-line
      }, [SelectedIssue]
      )


      return renderItem ? (
        renderItem({
          dragOverlay: Boolean(dragOverlay),
          dragging: Boolean(dragging),
          sorting: Boolean(sorting),
          index,
          fadeIn: Boolean(fadeIn),
          listeners,
          ref,
          style,
          transform,
          transition,
          value,
        })
      ) : (
        <li
          className={`first:mt-0 mt-1 ${dragging ? 'opacity-0' : '' }`}
          style={
            {
              display: 'flex',
              transform: 'translate3d(var(--translate-x, 0), var(--translate-y, 0), 0) scaleX(var(--scale-x, 1)) scaleY(var(--scale-y, 1))',
              transition,
              '--translate-x': transform
                ? `${Math.round(transform.x)}px`
                : undefined,
              '--translate-y': transform
                ? `${Math.round(transform.y)}px`
                : undefined,
              '--scale-x': transform?.scaleX
                ? `${transform.scaleX}`
                : undefined,
              '--scale-y': transform?.scaleY
                ? `${transform.scaleY}`
                : undefined,
              '--index': index,
              '--color': color,
            } as React.CSSProperties

          }
          ref={ref}
          onClick={() => {
            setSelectedIssue(issueItem)
            setEditIssueModal(true)
            console.log(issueItem)
          }}
        >
          <div
            className={`
             bg-[#eaeaea] w-[100%]
            p-2 rounded-md text-[#303030] 
            border-b-[#cecece] border-b-[0.0025em]
            border-left text-[0.9em] hover:bg-[#98c9e521]
            ${dragOverlay ? 'hover:bg-[#eaeaea] bg-[#eaeaea]' : 'hover:bg-[#98c9e521]' }
            ${dragOverlay ? 
              'z-10 cursor-grabbing transition duration-200 ease-in-out hover:shadow-xl hover:-translate-y-1 hover:scale-102.5 ' : '' }
            `}
            // style={style}
            data-cypress="draggable-item"
            {...(!handle ? listeners : undefined)}
            {...props}
            // tabIndex={!handle ? 0 : undefined}
          >
            
            <div className='flex items-center'>
        <div>
        <CustomTooltip title={issueItem?.type}>
                  <div> 
                  {
                    issueItem?.type === 'Task' &&
                    <div className=' items-center text-center'>
                    <AiFillCheckSquare 
                    color='#5E8EBD' 
                    fontSize={'1.25em'}
                    className='drop-shadow-sm'
                    />
                </div>
                  }
                              {
                issueItem?.type === 'Bug' &&
                
                <div className=' items-center text-center'>
                    <MdError 
                    color='#B75858' 
                    fontSize={'1.25em'}
                    className='drop-shadow-sm'
                    />
                </div>
                
            }
            {
                issueItem?.type === 'Feature' &&
                
                <div className=' items-center text-center'>
                    <AiFillTool
                    color='#65A766' 
                    fontSize={'1.25em'}
                    className='drop-shadow-sm'
                    />
                </div>
                
            }
            </div>
            </CustomTooltip>
        </div>
        <div className='ml-2 text-[#303030]'>
            {issueItem?.summary}
        </div>
        </div>
          </div>
        </li>
      );
    }
  )
);

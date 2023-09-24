// @ts-nocheck
import React, { RefObject, SetStateAction, useCallback, useEffect, useRef, useState} from "react";
import { createPortal, unstable_batchedUpdates } from "react-dom";
import _ from 'lodash'
import {
  CancelDrop,
  closestCenter,
  pointerWithin,
  rectIntersection,
  CollisionDetection,
  DndContext,
  DragOverlay,
  DropAnimation,
  getFirstCollision,
  defaultDropAnimation,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  Modifiers,
  useDroppable,
  UniqueIdentifier,
  useSensors,
  useSensor,
  MeasuringStrategy,
} from "@dnd-kit/core";
import {
  AnimateLayoutChanges,
  SortableContext,
  useSortable,
  arrayMove,
  defaultAnimateLayoutChanges,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  SortingStrategy,
  horizontalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Item, Container, ContainerProps } from "../components";
import { AiOutlinePlus } from "react-icons/ai";
import { CustomTooltip } from "../../../CustomTooltip";
import { AddContainer } from "../components/AddContainer";
import axios from "axios";
import { IssueContexts } from "../../../../contexts/IssueContexts";
import { SprintContexts } from "../../../../contexts/SprintContexts";
import { AuthContexts } from "../../../../App/Auth";
// const data = require('../../../../pages/routes.json')

// function useForceUpdate(){
//   const [value, setValue] = useState(0); // integer state
//   return () => setValue(value => value + 1); // update state to force render
//   // A function that increment 👆🏻 the previous state like here 
//   // is better than directly setting `setValue(value + 1)`
// }

const animateLayoutChanges: AnimateLayoutChanges = (args) =>
  args.isSorting || args.wasDragging ? defaultAnimateLayoutChanges(args) : true;

function DroppableContainer({
  children,
  columns = 1,
  disabled,
  id,
  items,
  style,
  ...props
}: ContainerProps & {
  disabled?: boolean;
  id: string;
  items: string[];
  style?: React.CSSProperties;
}) {
  const {
    active,
    attributes,
    isDragging,
    listeners,
    over,
    setNodeRef,
    transition,
    transform
  } = useSortable({
    id,
    data: {
      type: "container"
    },
    animateLayoutChanges
  });
  const isOverContainer = over
    ? (id === over.id && active?.data.current?.type !== "container") ||
      items.includes(over.id)
    : false;

  return (
    <Container
      ref={disabled ? undefined : setNodeRef}
      style={{
        ...style,
        transition,
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0 : undefined
      }}
      hover={isOverContainer}
      handleProps={{
        ...attributes,
        ...listeners
      }}
      columns={columns}
      {...props}
      
    >
      {children}
    </Container>
  );
}

const dropAnimation: DropAnimation = {
  ...defaultDropAnimation,
  dragSourceOpacity: 0.5
};

type Items = Record<string, string[]>;
type Issues = Record<string, any[]>;
type Sprint = Record<string, any>;

type Issue = {
  _id: string,
  summary: string,
  type: string,
}

interface Props {
  adjustScale?: boolean;
  cancelDrop?: CancelDrop;
  columns?: number;
  containerStyle?: React.CSSProperties;
  getItemStyles?(args: {
    value: UniqueIdentifier;
    index: number;
    overIndex: number;
    isDragging: boolean;
    containerId: UniqueIdentifier;
    isSorting: boolean;
    isDragOverlay: boolean;
  }): React.CSSProperties;
  wrapperStyle?(args: { index: number }): React.CSSProperties;
  itemCount?: number;
  items?: Items;
  handle?: boolean;
  renderItem?: any;
  strategy?: SortingStrategy;
  modifiers?: Modifiers;
  minimal?: boolean;
  trashable?: boolean;
  scrollable?: boolean;
  vertical?: boolean;
  issues?: Issues;
  setIssues?:React.Dispatch<SetStateAction<any[]>>;
  ProjectNav?: boolean;
  SelectedSprint?: Sprint,
  SprintIssues?: Issue[],
  ScreenWidth?: number;
  issuesCopy?: MutableRefObject<any>
}

export const TRASH_ID = "void";
const PLACEHOLDER_ID = "placeholder";
// const empty: UniqueIdentifier[] = [];

export function MultipleContainers(
  {
  adjustScale = false,
  cancelDrop,
  columns,
  handle = false,
  containerStyle,
  getItemStyles = () => ({}),
  wrapperStyle = () => ({}),
  minimal = false,
  modifiers,
  renderItem,
  strategy = verticalListSortingStrategy,
  trashable = false,
  vertical = false,
  scrollable,
  issues,
  setIssues,
  SelectedSprint,
  SprintIssues,
  ScreenWidth,
  issuesCopy
  }: Props ) {

  const { setSelectedSprint, AddedStage, setAddedStage } = SprintContexts();
  const { setSelectedIssue } = IssueContexts();
  const { user } = AuthContexts();


  // useEffect(() => issuesCopy.current = issues, [issues])
  const [items, setItems] = useState<Issues>(() => issues ?? null);

  //   useEffect(() => {
  //   console.log(_.isEqual(issuesCopy.current, issues))
  //   console.log(_.isEqual(issuesCopy.current, items))
  //   //   if (!_.isEqual(issuesCopy.current, issues)) {
  //   //     console.log('a')
  //   //   issuesCopy.current = issues
  //   //   setItems(issues)
      
  //   // }
    
  //   // if (!_.isEqual(issuesCopy.current, items)) {
  //   //   console.log('b')
  //   //   issuesCopy.current = items
  //   //   setIssues(items)
  //   // }

  //   // if (!items?.length) setItems(issues)
  //   console.log('REF')
  // }, [items, issues, SelectedSprint._id])

  // useEffect(
  //   () => {
  //     // if (!items?.length) setItems(issues)

  //     if (Object.keys(issues)?.length) {
  //       Object.keys(issues).map(key => {
  //       if (issues[key]?.length) {
  //         if (issues[key][0]?.sprint !== SelectedSprint._id) {
  //           setItems(issues)
  //           setIsInit(true)
  //         }
  //       }
  //       })}

  //     // else setItems(issuesCopy.current)
  //   }, [SelectedSprint, issues]
  // )
console.log(issues)


  const [containers, setContainers] = useState<string[]>(
    Object.keys(items) as UniqueIdentifier[]
  );
  
  // useEffect(
  //   () => {
  //     if (issues) {
  //       setContainers(Object.keys(issues))
  //     }
  //   }, [issues]
  // )
// console.log(issues)





  

  const [addStage, setAddStage] = useState<boolean>(false)

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const lastOverId = useRef<UniqueIdentifier | null>(null);
  const recentlyMovedToNewContainer = useRef(false);
  const isSortingContainer = activeId ? containers.includes(activeId) : false;

  // const numStages = SelectedSprint?.stages?.length;
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (offset) => { scrollRef.current.scrollLeft += offset };
  useEffect(() => {
    if (AddedStage) {
      console.log('foo')
      setTimeout(() => scroll(300), 5)
    }
    setAddedStage(false)
    // eslint-disable-next-line
  }, [AddedStage])

  
  // Custom collision detection strategy optimized for multiple containers
  const collisionDetectionStrategy: CollisionDetection = useCallback(
    (args) => {
      if (activeId && activeId in items) {
        return closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter(
            (container) => container.id in items
          ),
        });
      }

      // Start by finding any intersecting droppable
      const pointerIntersections = pointerWithin(args);
      const intersections =
        pointerIntersections.length > 0
          ? // If there are droppables intersecting with the pointer, return those
            pointerIntersections
          : rectIntersection(args);
      let overId = getFirstCollision(intersections, 'id');

      if (overId != null) {
        if (overId === TRASH_ID) {
          // If the intersecting droppable is the trash, return early
          // Remove this if you're not using trashable functionality in your app
          return intersections;
        }

        if (overId in items) {
          const containerItems = items[overId];

          // If a container is matched and it contains items (columns 'A', 'B', 'C')
          if (containerItems.length > 0) {
            // Return the closest droppable within that container
            overId = closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(
                (container) =>
                  container.id !== overId &&
                  containerItems.includes(container.id)
              ),
            })[0]?.id;
          }
        }

        lastOverId.current = overId;

        return [{id: overId}];
      }

      // When a draggable item moves to a new container, the layout may shift
      // and the `overId` may become `null`. We manually set the cached `lastOverId`
      // to the id of the draggable item that was moved to the new container, otherwise
      // the previous `overId` will be returned which can cause items to incorrectly shift positions
      if (recentlyMovedToNewContainer.current) {
        lastOverId.current = activeId;
      }

      // If no droppable is matched, return the last match
      return lastOverId.current ? [{id: lastOverId.current}] : [];
    },
    [activeId, items]
  );
  
  const [clonedItems, setClonedItems] = useState<Items | null>(null);


  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 0.5 }
    }),
    useSensor(TouchSensor, {
      activationConstraint: { distance: 0.5 }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
      activationConstraint: { distance: 1 }
    })
  );

  


  const findContainer = (id: UniqueIdentifier) => {
    if (id in items) {
      return id;
    }

    return Object.keys(items).find((key) => items[key].includes(id));
  };

  const getIndex = (id: UniqueIdentifier) => {
    const container = findContainer(id);

    if (!container) {
      return -1;
    }

    const index = items[container].indexOf(id);

    return index;
  };

  const onDragCancel = () => {
    if (clonedItems) {
      // Reset items to their original state in case items have been
      // Dragged across containrs
      setItems(clonedItems);
    }

    setActiveId(null);
    setClonedItems(null);
  };

  useEffect(() => {
    requestAnimationFrame(() => {
      recentlyMovedToNewContainer.current = false;
    });
  }, [items]);



  return (
    <> 
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always
        }
      }}
      onDragStart={({ active }) => {
        document.body.style.setProperty('cursor', 'grabbing')
        setActiveId(active.id);
        setClonedItems(items);
      }}

      onDragOver={({active, over}) => {
        const overId = over?.id;

        if (overId == null || overId === TRASH_ID || active.id in items) {
          return;
        }

        const overContainer = findContainer(overId);
        const activeContainer = findContainer(active.id);

        if (!overContainer || !activeContainer) {
          return;
        }

        if (activeContainer !== overContainer) {
          setItems((items) => {
            const activeItems = items[activeContainer];
            const overItems = items[overContainer];
            const overIndex = overItems.indexOf(overId);
            const activeIndex = activeItems.indexOf(active.id);

            let newIndex: number;

            if (overId in items) {
              newIndex = overItems.length + 1;
            } else {
              const isBelowOverItem =
                over &&
                active.rect.current.translated &&
                active.rect.current.translated.top >
                  over.rect.top + over.rect.height;

              const modifier = isBelowOverItem ? 1 : 0;

              newIndex =
                overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
            }

            recentlyMovedToNewContainer.current = true;

            return {
              ...items,
              [activeContainer]: items[activeContainer].filter(
                (item) => item !== active.id
              ),
              [overContainer]: [
                ...items[overContainer].slice(0, newIndex),
                items[activeContainer][activeIndex],
                ...items[overContainer].slice(
                  newIndex,
                  items[overContainer].length
                ),
              ],
            };
          });
        }
      }}

      onDragEnd={({active, over}) => {
        if (active.id in items && over?.id) {
          setContainers((containers) => {
            const activeIndex = containers.indexOf(active.id);
            const overIndex = containers.indexOf(over.id);

            return arrayMove(containers, activeIndex, overIndex);
          });
        }

        const activeContainer = findContainer(active.id);

        if (!activeContainer) {
          setActiveId(null);
          return;
        }

        const overId = over?.id;

        if (overId == null) {
          setActiveId(null);
          return;
        }

        if (overId === TRASH_ID) {
          setItems((items) => ({
            ...items,
            [activeContainer]: items[activeContainer].filter(
              (id) => id !== activeId
            ),
          }));
          setActiveId(null);
          return;
        }

        if (overId === PLACEHOLDER_ID) {
          const newContainerId = getNextContainerId();

          unstable_batchedUpdates(() => {
            setContainers((containers) => [...containers, newContainerId]);
            setItems((items) => ({
              ...items,
              [activeContainer]: items[activeContainer].filter(
                (id) => id !== activeId
              ),
              [newContainerId]: [active.id],
            }));
            setActiveId(null);
          });
          return;
        }

        const overContainer = findContainer(overId);

        if (overContainer) {
          const activeIndex = items[activeContainer].indexOf(active.id);
          const overIndex = items[overContainer].indexOf(overId);

          if (activeIndex !== overIndex) {
            setItems((items) => ({
              ...items,
              [overContainer]: arrayMove(
                items[overContainer],
                activeIndex,
                overIndex
              ),
            }));
          }
        }

        setActiveId(null);
      }}
      cancelDrop={cancelDrop}
      onDragCancel={onDragCancel}
      modifiers={modifiers}
    >
      {containers !== undefined && containers?.length && SelectedSprint ? 
            <div 

            className={
              `${ScreenWidth > 1350 ? 'min-w-[59vw] w-[59vw]' : 'min-w-[55vw] w-[55vw]'}
              
              flex flex-nowrap font-lato whitespace-nowrap
              mt-[8em] overflow-scroll list-none pb-5 scroll-smooth
              `
              }
              style={{
                transition: 'all 0.2s ease-in-out'
              }}
              ref={scrollRef}
              >
                <SortableContext
                  items={[...containers, PLACEHOLDER_ID]}
                  strategy={
                    vertical
                      ? verticalListSortingStrategy
                      : horizontalListSortingStrategy
                  }
                >
                  {containers?.map((containerId) => (
                    <DroppableContainer
                      key={containerId}
                      id={containerId}
                      label={minimal ? undefined : `${containerId}`}
                      columns={columns}
                      items={items[containerId]}
                      scrollable={scrollable}
                      style={containerStyle}
                      unstyled={minimal}
                      onRemove={() => handleRemove(containerId)}
                      // Stage={
                      //   minimal ? undefined : (
                      //     SelectedSprint?.stages.filter(stage =>
                      //           stage.title === `${containerId}`
                      //         )[0] 
                      //   )
                      // }
                      size={items[containerId]?.length}
                      isSorting={isSortingContainer}
                    >
                      <SortableContext items={items[containerId]} strategy={strategy}>
                        {items[containerId]?.map(
                          (value: Issue, index) => {
                          return (
                            <SortableItem
                              disabled={isSortingContainer}
                              key={value?._id}
                              id={value}
                              index={index}
                              handle={handle}
                              style={getItemStyles}
                              wrapperStyle={wrapperStyle}
                              renderItem={renderItem}
                              containerId={containerId}
                              getIndex={getIndex}
                              // Stage={
                              //   minimal ? undefined : (
                              //     SelectedSprint?.stages.filter(stage =>
                              //           stage.title === `${containerId}`
                              //         )[0] 
                              //   )
                              // }
                            />
                          );
                        })}
                      </SortableContext>
                    </DroppableContainer>
                  ))}
                  {addStage ? 
                  <AddContainer 
                  addStage={addStage}
                  setAddStage={setAddStage}
                  />
                  : null

                  }
                  {!addStage && 
                  <CustomTooltip title={'Add Column'} placement='top' arrow> 
                    <div
                    className="h-fit items-top"
                    onClick={() => setAddStage(true)}
                    >
                      <AiOutlinePlus fontSize={'1.5em'}
                      className='bg-[#e4e4e4] rounded-md
                      ml-1 hover:cursor-pointer transition ease-in-out 
                      hover:scale-[1.15] duration-150'
                      />
                    </div>
                    </CustomTooltip>}

                </SortableContext>
              </div> : null
      }


      {createPortal(
        <DragOverlay adjustScale={adjustScale} dropAnimation={dropAnimation} className='font-lato'>
          {activeId
            ? containers.includes(activeId)
              ? renderContainerDragOverlay(activeId)
              : renderSortableItemDragOverlay(activeId)
            : null}
        </DragOverlay>,
        document.body
      )}
      {trashable && activeId && !containers.includes(activeId) ? (
        <Trash id={TRASH_ID} />
      ) : null}
    </DndContext>


      </>
  );

        

  function renderSortableItemDragOverlay(id: UniqueIdentifier) {
    return (
      <Item
        value={id}
        handle={handle}
        style={getItemStyles({
          containerId: findContainer(id) as string,
          overIndex: -1,
          index: getIndex(id),
          value: id,
          isSorting: true,
          isDragging: true,
          isDragOverlay: true
        })}
        // isDragging={true}
        color={getColor(id)}
        wrapperStyle={wrapperStyle({ index: 0 })}
        renderItem={renderItem}
        dragOverlay
      />
    );
  }

  function renderContainerDragOverlay(containerId: string) {
    return (
      <Container
        label={`${containerId}`}
        // columns={columns}
        style={{
          height: "100%"
        }}
        // shadow
        // unstyled={false}
        // Stage={
        //   minimal ? undefined : (
        //     SelectedSprint?.stages.filter(stage =>
        //           stage.title === `${containerId}`
        //         )[0])}
        size={items[containerId]?.length}
        isSorting={isSortingContainer}
      >
        {items[containerId].map(
          (item: Issue, index) => (
          <Item
            key={item?._id}
            value={item}
            handle={handle}
            style={getItemStyles({
              containerId,
              overIndex: -1,
              index: getIndex(item),
              value: item,
              isDragging: false,
              isSorting: false,
              isDragOverlay: false
            })}
            color={getColor(item)}
            wrapperStyle={wrapperStyle({ index })}
            renderItem={renderItem}

            
          />
        ))}
      </Container>
    );
  }

  function handleRemove(containerID: UniqueIdentifier) {
    setContainers((containers) =>
      containers.filter((id) => id !== containerID)
    );
  }


  function getNextContainerId() {
    const containeIds = Object.keys(items);
    const lastContaineId = containeIds[containeIds.length - 1];

    return String.fromCharCode(lastContaineId.charCodeAt(0) + 1);
  }
}

function getColor(id: string) {
  switch (id[0]) {
    case "A":
      return "#7193f1";
    case "B":
      return "#ffda6c";
    case "C":
      return "#00bcd4";
    case "D":
      return "#ef769f";
  }

  return undefined;
}

function Trash({ id }: { id: UniqueIdentifier }) {
  const { setNodeRef, isOver } = useDroppable({
    id
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        left: "50%",
        marginLeft: -150,
        bottom: 20,
        width: 300,
        height: 60,
        borderRadius: 5,
        border: "1px solid",
        borderColor: isOver ? "red" : "#DDD"
      }}
    >
      Drop here to delete
    </div>
  );
}

interface SortableItemProps {
  containerId: string;
  id: Issue;
  index: number;
  handle: boolean;
  disabled?: boolean;
  style(args: any): React.CSSProperties;
  getIndex(id: string): number;
  renderItem(): React.ReactElement;
  wrapperStyle({ index }: { index: number }): React.CSSProperties;
}

function SortableItem({
  disabled,
  id,
  index,
  handle,
  renderItem,
  style,
  containerId,
  getIndex,
  wrapperStyle
}: SortableItemProps) {
  const {
    setNodeRef,
    listeners,
    isDragging,
    isSorting,
    over,
    overIndex,
    transform,
    transition
  } = useSortable({
    id
  });
  const mounted = useMountStatus();
  const mountedWhileDragging = isDragging && !mounted;

  return (
    <Item
      ref={disabled ? undefined : setNodeRef}
      value={id}
      dragging={isDragging}
      sorting={isSorting}
      handle={handle}
      index={index}
      wrapperStyle={wrapperStyle({ index })}
      style={style({
        index,
        value: id,
        isDragging,
        isSorting,
        // @ts-ignore
        overIndex: over ? getIndex(over.id) : overIndex,
        containerId
      })}
      color={getColor(id)}
      transition={transition}
      transform={transform}
      fadeIn={mountedWhileDragging}
      listeners={listeners}
      renderItem={renderItem}
    />
  );
}

function useMountStatus() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 500);

    return () => clearTimeout(timeout);
  }, []);

  return isMounted;
}
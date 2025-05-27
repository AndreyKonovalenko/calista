import React, { useRef } from 'react';
import { useLocation, Link } from 'react-router';
// import {useDrop, useDrag} from 'react-dnd';
// import { TDraggableElement } from '../../../utils/types';
// import { calculateNewPosition } from '../../../utils/utils';

const BoardCardDndContainer = (props: {
  children: React.ReactNode;
  id: string;
  pos: number;
  listId: string;
}) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const { id, children } = props;
  const location = useLocation();

  // const [{ isOver }, connectDrop] = useDrop<
  //   TDraggableElement,
  //   unknown,
  //   {
  //     isOver: boolean;
  //   }
  // >({
  //   accept: ['cards'],
  //   hover({ id: draggedId }, monitor) {
  //     const itemType = monitor.getItemType();
  //     console.log(itemType);
  //     if (itemType === 'cards') {
  //       if (draggedId !== id) {
  //         const newPos = calculateNewPosition(cards, id, draggedId);
  //         // setCalculatedListPos(newPos);
  //         if (newPos && newPos !== -1) {
  //           // updateListPosByListId(draggedId, newPos);
  //         }
  //       }
  //     }

  //   },
  //   drop({ id: draggedId }) {
  //     console.log('did drop', calculatedListPos);
  //     if (calculatedListPos === -1) {
  //       updateBoardById.mutate({ id: _id, data: { action: 'renumbering' } });
  //     }
  //     if (calculatedListPos != undefined && calculatedListPos > 0) {
  //       handleUpdateListPos(draggedId, calculatedListPos);
  //     }
  //     setCalculatedListPos(undefined);
  //   },
  //   collect: monitor => ({
  //     isOver: monitor.isOver(),
  //     differenceOffset: monitor.getDifferenceFromInitialOffset(),
  //   }),
  // });

  // const [{ isDragging }, connectDrag] = useDrag<
  //   TDraggableElement,
  //   unknown,
  //   { isDragging: boolean }
  // >({
  //   type: 'list',
  //   item: { id, pos },
  //   collect: monitor => ({
  //     isDragging: monitor.isDragging(),
  //   }),
  // });

  // connectDrag(ref);
  // connectDrop(ref);

  return (
    <Link to={`cards/${id}`} ref={ref} state={{ background: location }}>
      {children}
    </Link>
  );
};

export default BoardCardDndContainer;

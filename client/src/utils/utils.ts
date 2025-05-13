import { IList } from '../services/lists/list-store';

export default function validEnv(name: string | undefined): string {
  if (!name) {
    throw new Error('missing env');
  }
  return name;
}

export function invariantId(value: string | undefined): asserts value {
  if (value) {
    return;
  }
  throw new Error('Invariant violation');
}

export function calculateNewPosition(
  arr: Array<IList>,
  dropId: string,
  dragId: string,
): number | undefined {
  const dropElement = arr.find(element => element._id === dropId);
  const dragElement = arr.find(element => element._id === dragId);

  if (!dropElement || !dragElement) {
    return;
  }

  const dropIndex = arr.indexOf(dropElement);
  const dragIndex = arr.indexOf(dragElement);
  const { pos } = dropElement;
  const start = Boolean(dropIndex === 0);
  const end = Boolean(dropIndex === arr.length - 1);

  if (Math.abs(dragElement.pos - dropElement.pos) <= 100) {
    return -1;
  }

  if (start) {
    return Math.trunc(arr[0].pos / 2);
  }
  if (end) {
    return arr[arr.length - 1].pos + 16384;
  }
  // drag from right to left
  if (dragIndex < dropIndex) {
    const leftNeihborPos = arr[dropIndex + 1].pos;
    const newPos = Math.trunc((pos + leftNeihborPos) / 2);
    if (
      Math.abs(newPos - pos) <= 100 ||
      Math.abs(newPos - leftNeihborPos) <= 100
    ) {
      return -1;
    } else {
      return newPos;
    }
  }
  // drag from left to right
  if (dragIndex > dropIndex) {
    const rightNeighborPos = arr[dropIndex - 1].pos;
    const newPos = Math.trunc((pos + rightNeighborPos) / 2);
    if (
      Math.abs(newPos - pos) <= 100 ||
      Math.abs(newPos - rightNeighborPos) <= 100
    ) {
      return -1;
    } else {
      return newPos;
    }
  }
}

export const calcNewPos = (arr: Array<IList>, draggedId:string): number | undefined  => {
  const elementIndex = arr.findIndex(element => element._id === draggedId);
  const length = arr.length
  if (length <=1) {
    return
  }
  if (elementIndex == 0) {
    return Math.trunc(arr[1].pos / 2)
  }
  if (elementIndex == length - 1) {
    return  arr[length - 1].pos + 16834
  }    
  if ( (elementIndex  >  0) && (elementIndex <  length - 1)) {
    return  Math.trunc((arr[elementIndex -1].pos + arr[elementIndex + 1].pos)/2 )
  }
}

export const handleFormSubmitEvent = (
  event:
    | React.KeyboardEvent<HTMLTextAreaElement>
    | React.FocusEvent<HTMLTextAreaElement>,
) => {
  const formEvent = new Event('submit', {
    bubbles: true,
    cancelable: true,
  });
  event.currentTarget.form?.dispatchEvent(formEvent);
};

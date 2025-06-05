import {TList } from './types';

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
  obj: {[key:string]: TList},
  dropId: string,
  dragId: string,
): number | undefined {
  const toArr = Object.keys(obj)
  const dropIndex = toArr.indexOf(dropId);
  const dragIndex = toArr.indexOf(dragId);
  const dragPos = obj[dragId].pos;
  const dropPos = obj[dropId].pos;
  console.log(dropPos, dragPos)
  const start = Boolean(dropIndex === 0);
  const end = Boolean(dropIndex === toArr.length - 1);
   
  // if (!dropIndex || !dragIndex) {
  //   return;
  // }

  if (Math.abs(dragPos - dropPos) <= 100) {
    return -1;
  }
  if (start) {
    return Math.trunc(obj[toArr[0]].pos / 2);
  }
  if (end) {
    return obj[toArr[toArr.length - 1]].pos + 16384;
  }
  // drag <--- from right to left 
  if (dragIndex < dropIndex) {
    console.log('from right to left')
    const leftNeihborPos = obj[toArr[dropIndex + 1]].pos;
    console.log(leftNeihborPos)
    const newPos = Math.trunc((dropPos + leftNeihborPos) / 2);
    if (
      Math.abs(newPos - dropPos) <= 100 ||
      Math.abs(newPos - leftNeihborPos) <= 100
    ) {
      return -1;
    } else {
      return newPos;
    }
  }
  // drag ---> from left to right 
  if (dragIndex > dropIndex) {
    console.log('from left to right')
    const rightNeighborPos = obj[toArr[dropIndex - 1]].pos;
    console.log(rightNeighborPos)
    const newPos = Math.trunc((dropPos + rightNeighborPos) / 2);
    if (
      Math.abs(newPos - dropPos) <= 100 ||
      Math.abs(newPos - rightNeighborPos) <= 100
    ) {
      return -1;
    } else {
      return newPos;
    }
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

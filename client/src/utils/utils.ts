import { ICardTrimmed, TList } from './types';

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
  obj: { [key: string]: TList | ICardTrimmed },
  dropId: string,
  dragId: string,
): number | null {
  const orderedLists = Object.keys(obj).sort((a, b) => {
    if (obj[a].pos < obj[b].pos) return -1;
    if (obj[a].pos > obj[b].pos) return 1;
    return 0;
  });
  const dropIndex = orderedLists.indexOf(dropId);

  const dropPos = obj[dropId].pos;
  const start = Boolean(dropIndex === 0);
  const end = Boolean(dropIndex === orderedLists.length - 1);

  if (start) {
    return Math.trunc(obj[orderedLists[0]].pos / 2);
  }
  if (end) {
    const endIndex = orderedLists.length - 1;
    return obj[orderedLists[endIndex]].pos + 16384;
  }

  const dragIndex = orderedLists.indexOf(dragId);

  if (dragIndex === -1) {
    const leftNeihborPos = obj[orderedLists[dropIndex + 1]].pos;
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

  const dragPos = obj[dragId].pos;

  if (Math.abs(dragPos - dropPos) <= 100) {
    return -1;
  }

  //drag <--- from right to left
  if (dragIndex < dropIndex) {
    const leftNeihborPos = obj[orderedLists[dropIndex + 1]].pos;
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
    const rightNeighborPos = obj[orderedLists[dropIndex - 1]].pos;
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

  return null;
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

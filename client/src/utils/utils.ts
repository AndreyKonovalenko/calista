import { ICard, IChecklistItem, IList } from './types';

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

export function calculateNewPosByTargetPart(
  obj: { [key: string]: IList | ICard },
  orderedLists: string[],
  dropId: string,
  targetPart: 'before' | 'after',
): number {
  const dropIndex = orderedLists.indexOf(dropId);
  if (dropIndex === 0) {
    return Math.trunc(obj[orderedLists[0]].pos / 2);
  }
  if (dropIndex === orderedLists.length - 1) {
    return obj[orderedLists[orderedLists.length - 1]].pos + 16384;
  }
  const targetPartPos =
    obj[orderedLists[targetPart === 'before' ? dropIndex - 1 : dropIndex + 1]]
      .pos;
  const dropPos = obj[dropId].pos;
  const newPos = Math.trunc((dropPos + targetPartPos) / 2);
  if (
    Math.abs(newPos - dropPos) <= 100 ||
    Math.abs(newPos - targetPartPos) <= 100
  ) {
    return -1;
  } else {
    return newPos;
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

export function progressCalc(
  sortedChecklistItemList: string[],
  checklistItems: { [key: string]: IChecklistItem },
): number {
  if (sortedChecklistItemList.length > 0) {
    const length = sortedChecklistItemList.length;
    const conplited = sortedChecklistItemList.reduce(
      (accumulator, currentValue) => {
        const complite =
          checklistItems[currentValue as keyof typeof checklistItems].state ===
          'complete'
            ? 1
            : 0;
        return accumulator + complite;
      },
      0,
    );
    return Math.floor((conplited / length) * 100);
  }
  return 0;
}

import { IList } from "../services/lists/list-store";

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


export function calculateNewPosition(arr:Array<IList>, dropId:string, dragId: string ): number | undefined  {
  const dropElement = arr.find(element => element._id === dropId); 
  const dragElement = arr.find(element => element._id === dragId)

  if (!dropElement || ! dragElement) {
    return
  }

  const dropIndex = arr.indexOf(dropElement)
  const dragIndex = arr.indexOf(dragElement)
  const { pos } = dropElement;
  const start = Boolean(dropIndex === 0)
  const end = Boolean(dropIndex === arr.length -1)

  if (start) {
    console.log('start case')
    return Math.trunc(arr[0].pos / 2)
  }
  if (end) {
    console.log('end case')
    return (arr[arr.length - 1].pos + 16384)
  }
  // drag from right to left 
  if (dragIndex < dropIndex) {
    return Math.trunc((pos +  arr[dropIndex + 1].pos) / 2)
  }
  // drag from left to right
  if (dragIndex > dropIndex) {
    return Math.trunc((pos +  arr[dropIndex - 1].pos) / 2)
  }
   
}
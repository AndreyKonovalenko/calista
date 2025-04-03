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


export function calculateNewPosition(arr:Array<IList>, dropId:string, dragId:string): number | undefined  {
  const dropElement = arr.find(element => element._id === dropId); 
  const dragElement = arr.find(element => element._id === dragId)
  if (!dropElement || !dragElement) {
    return
  }
  const dropIndex = arr.indexOf(dropElement)
  const dragIndex = arr.indexOf(dragElement)
  const dropPos = dropElement.pos;
  const dragPos = dragElement.pos;
  const start = Boolean(dropIndex === 0)
  const end = Boolean(dropIndex === arr.length -1)

  console.log('dropIndex', dropIndex, 'dragIndex', dragIndex)
  if (start) {
    console.log(dropIndex, dropPos, dragPos)
    return Math.trunc(dropPos / 2)
  }
  if (end) {
    return (dropPos + 16384)
  }
  if (!start&&!end){
    const previus = arr[dropIndex -1];
    return Math.trunc((dropPos +  previus.pos) / 2)
  }
}
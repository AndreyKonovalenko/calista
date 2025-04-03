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


export function calculateNewPosition(arr:Array<IList>, dropId:string ): number | undefined  {
  const dropElement = arr.find(element => element._id === dropId); 

  if (!dropElement) {
    return
  }

  const dropIndex = arr.indexOf(dropElement)
  console.log(dropIndex)
  const { pos } = dropElement;
  console.log(pos)
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

  if ((dropIndex < arr.length - 1) && (dropIndex > 0) ){
    console.log('midleCase')
    const previus = arr[dropIndex -1];
    console.log(dropIndex, dropIndex - 1 )
    console.log((pos +  previus.pos) / 2)
    console.log(pos, previus.pos)
    return Math.trunc((pos +  previus.pos) / 2)
  }
}
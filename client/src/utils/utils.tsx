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


export function calculateNewPosition(arr:Array<IList>, dropPos:number): number {
  const dropIndex = arr.findIndex(element => element.pos === dropPos); 

  const start = Boolean(dropIndex === 0)
  const end = Boolean(dropIndex === arr.length -1)

  if (start) {
    return (dropPos / 2)
  }
  if (end) {
    return (dropPos + 16384)
  }
  if (!start&&!end){
    const previus = arr[dropIndex -1];
    return((dropPos +  previus.pos) / 2)
  }
  return 16384;
}
import { Types } from "mongoose";

type TSortable = {
  _id: Types.ObjectId,
  pos: number
}

export function ascendingComparator (a:TSortable, b: TSortable): number {
  if (a.pos < b.pos) return -1;
  if (a.pos > b.pos) return 1;
  return 0
}
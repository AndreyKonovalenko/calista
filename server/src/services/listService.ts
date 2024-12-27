import { IList, ListModal } from '../models';
import { HydratedDocument } from 'mongoose';

export async function createList(
  list: IList,
): Promise<HydratedDocument<IList>> {
  const newList: HydratedDocument<IList> = await ListModal.create(list);
  return newList;
}

export async function findListByListId(
  id: string,
): Promise<HydratedDocument<IList> | null> {
  const list: HydratedDocument<IList> | null = await ListModal.findOne({
    _id: id,
  });
  return list;
}

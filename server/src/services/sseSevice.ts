import { Response } from "express";
import { Types } from "mongoose";

export type TSseClient = {
  res: Response,
  id: Types.ObjectId 
}

const clients:Array<TSseClient> = [];

export const addClient = (client: TSseClient) => {
   clients.push(client)
   console.log(`Edded new client ${client.id}. Client list length: ${clients.length}`)
}

export const removeClient = (res: Response) => {
  const index = clients.findIndex(client => client.res === res);
  if (index >= 0) {
    clients.splice(index, 1);
    console.log(`Client removed from list. Client list length: ${clients.length}`)
  }
}
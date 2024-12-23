import { Types } from 'mongoose';

export type TSseClient = {
  clientId: string;
  userId: Types.ObjectId;
};

const clients: Array<TSseClient> = [];

export const addClient = (client: TSseClient) => {
  clients.push(client);
  console.log(
    `Edded new client ${client.clientId} Client list length: ${clients.length}`,
  );
};

export const removeClient = (clientId: string) => {
  const index = clients.findIndex(element => element.clientId === clientId);
  if (index >= 0) {
    clients.splice(index, 1);
    console.log(
      `Client ${clientId} removed from list. Client list length: ${clients.length}`,
    );
  }
};

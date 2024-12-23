import { Application, NextFunction, Request, Response } from 'express';
import { CustomRequest } from '../middleware/protected';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { getErrorMessage } from '../utils';
import { TSseClient } from '../services/sseService';
import { addClient, removeClient } from '../services/sseService';
import { v4 as uuidv4 } from 'uuid';
import { BoardModal } from '../models';

// GET:sse/
export const connectToSse =  (async (req: Request, res: Response) => {
  const { user } = req as CustomRequest;
  if (!user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send(ReasonPhrases.UNAUTHORIZED);
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Content-Encoding', 'none');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Transfer-Encoding', 'chunked');
  res.flushHeaders();

  // res.write(`retry: 1000\n`);

  const clientId = uuidv4();
  const newClient: TSseClient = {
    clientId,
    userId: user._id,
  };

  console.log('newclient', newClient);
  addClient(newClient);


  BoardModal.watch().on('change', data => res.write(`data: ${JSON.stringify(data)}\n\n`))
  // res.write(`data: ${JSON.stringify(data)}\n\n`);

  // const interval = setInterval(() => {
  //   const stock1Rate = Math.floor(Math.random() * 100000);
  //   const stock2Rate = Math.floor(Math.random() * 60000);
  //   console.log(stock1Rate);
  //   res.write(`data: ${JSON.stringify({ stock1Rate, stock2Rate })}\n\n`);
  //   res.write(`event: message\n`);
  // }, 2000);

  res.on('close', (err: string) => {
    // clearInterval(interval);
    removeClient(clientId)
    if(err) {
      console.log(err);
    }
    console.log('connection canciled');
  });
}) as Application;

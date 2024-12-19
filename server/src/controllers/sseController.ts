import { Application, NextFunction, Request, Response } from 'express';
import { CustomRequest } from "../middleware/protected";
import { StatusCodes,ReasonPhrases } from 'http-status-codes';
import { getErrorMessage } from '../utils';
import { TSseClient } from '../services/sseService';
import { addClient, removeClient } from '../services/sseService';
import {v4 as uuidv4} from 'uuid'

// GET:sse/
export const connectToSse = ((req: Request, res: Response) => {
  const { user } = req as CustomRequest;
  if (!user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send(ReasonPhrases.UNAUTHORIZED);
  }
  
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "no-cache",
    'Connection': "keep-alive", // allowing TCP connection to remain open for multiple HTTP requests/responses
    "Content-Type": "text/event-stream" 
  };

  const clientId = uuidv4()
  res.writeHead(StatusCodes.OK, headers);
  res.write(`retry: 1000\n`);
  const newClient: TSseClient = {
    clientId,
    userId: user._id   
  }
  console.log('newclient', newClient)
  addClient(newClient);

  const interval = setInterval(() => {
    const stock1Rate = Math.floor(Math.random() * 100000);
    const stock2Rate = Math.floor(Math.random() * 60000);
    res.write(`data: ${JSON.stringify({ stock1Rate, stock2Rate })}\n\n`);
    res.write(`event: message\n`);
  }, 2000);

  res.on('close', (err:string) => {
    clearInterval(interval)
    console.log(err)
    console.log('connection canciled')
  })
}) as Application;
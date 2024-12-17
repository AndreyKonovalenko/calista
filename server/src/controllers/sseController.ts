import { Application, NextFunction, Request, Response } from 'express';
import { CustomRequest } from "../middleware/protected";
import { StatusCodes,ReasonPhrases } from 'http-status-codes';
import { getErrorMessage } from '../utils';
import { TSseClient } from '../services/sseService';
import { addClient, removeClient } from '../services/sseService';
import {v4 as uuidv4} from 'uuid'

// GET:sse/
export const connectToSse = (async (req: Request, res: Response) => {
  const { user } = req as CustomRequest;
    try {
      if (!user) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .send(ReasonPhrases.UNAUTHORIZED);
      }
      if (user) {
        const headers = {
          'Content-Type': 'text/event-stream',
          'Connection': 'keep-alive',
          'Cache-Control': 'no-cache'
        };
        const clientId = uuidv4()
        res.writeHead(StatusCodes.OK, headers);
        // res.write(`retry: 1000\n`);
        const newClient: TSseClient = {
          clientId,
          userId: user._id
      
        }
        console.log('newclient', newClient)
        addClient(newClient);

        res.on('close', (err:string) => {
          console.log(err)
          console.log('connection canciled')
        })
      }
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(getErrorMessage(error));
    }
}) as Application;
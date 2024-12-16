import { Application, Request, Response } from 'express';
import { CustomRequest } from "../middleware/protected";
import { StatusCodes,ReasonPhrases } from 'http-status-codes';
import { getErrorMessage } from '../utils';
import { TSseClient } from '../services/sseSevice';
import { addClient, removeClient } from '../services/sseSevice';

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
        res.writeHead(StatusCodes.OK, headers);
        const newClient: TSseClient = {
          res, 
          id: user._id
        }
        addClient(newClient);
        req.on('close', ()=> {
          removeClient(res)
        })
      }
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(getErrorMessage(error));
    }
}) as Application;
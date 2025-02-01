import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import {
  notFoundHandler,
  globalErrorHandler,
} from '../middleware/error-handlers';
import { authRouter } from '../routes/authRoutes';
import { boardsRouter } from '../routes/boardsRoutes';
import { cardsRouter } from '../routes/cardsRoutes';
import { sseRouter } from '../routes/sseRoutes';

const expressLoader = async (app: Express) => {
  // status checkpoints
  app.get('/status', (_req, res) => {
    res.sendStatus(200).end();
  });
  app.head('/status', (_req, res) => {
    res.sendStatus(200).end();
  });

  // middlewares
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  // routes
  app.use('/api/auth', authRouter);
  app.use('/api/boards', boardsRouter);
  app.use('/api/cards', cardsRouter);
  app.use('/api/sse', sseRouter);

  // error handlers
  app.use(notFoundHandler);
  app.use(globalErrorHandler);
};
export default expressLoader;

import express, { Express } from 'express';
import { authRouter } from '../routes/authRoutes';
import cookieParser from 'cookie-parser';
import { boardsRouter } from '../routes/boardsRoutes';
import { cardsRouter } from '../routes/cardsRoutes';
import cors from 'cors';
import { sseRouter } from '../routes/sseRoutes';
import ErrorHandler from '../middleware/error-handler';
import { statusRouter } from '../routes/statusRouter';

const expressLoader = async (app: Express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(cors());
  app.use('/api/auth', authRouter);
  app.use('/api/boards', boardsRouter);
  app.use('/api/cards', cardsRouter);
  app.use('/api/sse', sseRouter);
  app.use('/api/status', statusRouter);

  app.use(ErrorHandler);
};
export default expressLoader;

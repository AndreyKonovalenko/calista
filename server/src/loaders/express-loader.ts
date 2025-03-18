import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import {
  notFoundHandler,
  globalErrorHandler,
} from '../middleware/error-handlers';
import { authRouter } from '../routes/auth-routes';
import { boardsRouter } from '../routes/boards-routes';
import { cardsRouter } from '../routes/cards-routes';
// import { sseRouter } from '../routes/sse-routes';
import { listsRouter } from '../routes/lists-routes';
import { checkListsRouter } from '../routes/check-lists-routes';
import config from '../config';
import path from 'path';

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
  app.use('/api/lists', listsRouter);
  app.use('/api/cards', cardsRouter);
  app.use('/api/checklists', checkListsRouter);
  // app.use('/api/sse', sseRouter);

  if(config.nodeEnv === "production"){
    app.use(express.static(path.join(__dirname,  "../../../client/build")));
    app.get("/",(_req, res) => {
      res.sendFile(
        path.resolve(__dirname, "../../../", "client", "build", "index.html")
      )
    })
  };

  // error handlers
  app.use(notFoundHandler);
  app.use(globalErrorHandler);
};
export default expressLoader;

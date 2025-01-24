import express, { Response, Request, NextFunction } from 'express';
import { authRouter } from './routes/authRoutes';
import cookieParser from 'cookie-parser';
import { boardsRouter } from './routes/boardsRoutes';
import { cardsRouter } from './routes/cardsRoutes';
import cors from 'cors';
import { sseRouter } from './routes/sseRoutes';
import ErrorHandler from './middleware/error-handler';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(
//   cors({
//     credentials: true,
//     origin:
//       process.env.NODE_ENV === 'production'
//         ? process.env.CLIENT_URL
//         : terminalColors.yellow(`http://localhost:${port}`),
//   }),
// );
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/boards', boardsRouter);
app.use('/api/cards', cardsRouter)
app.use('/api/sse', sseRouter);
app.use('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send('Hello World');
  } catch (err) {
    next(err);
  }
});
app.use(ErrorHandler);

export default app;

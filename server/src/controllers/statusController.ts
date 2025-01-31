import { NextFunction, Request, Response } from 'express';

// POST /cards @pirvate

export const serverStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    res.send('Hello World');
  } catch (err) {
    next(err);
  }
};

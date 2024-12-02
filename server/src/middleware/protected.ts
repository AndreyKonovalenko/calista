import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { getErrorMessage } from '../utils';
import { TUserDoument } from '../models';
import { HydratedDocument } from 'mongoose';
import { findUserByUserId } from '../services/authService';

export interface CustomRequest extends Request {
	user: TUserDoument | null;
}

export const protect = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let token;
	token = req.cookies.jwt;
	try {
		if (!token) {
			return res
				.status(StatusCodes.UNAUTHORIZED)
				.send(ReasonPhrases.UNAUTHORIZED);
		}
		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
		(req as CustomRequest).user = await findUserByUserId(decoded.user_id);
		next();
	} catch (error) {
		return res.status(StatusCodes.UNAUTHORIZED).send(getErrorMessage(error));
	}
};

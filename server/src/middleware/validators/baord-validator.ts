import Joi from 'joi';
import { IBoard } from '../../models/BoardModel';
import customErrorMessages from './custom-error-messages';

export const boardValidator: Joi.ObjectSchema<IBoard> = Joi.object({
  name: Joi.string().max(30).messages(customErrorMessages.boardName),
});

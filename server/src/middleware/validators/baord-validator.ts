import Joi from 'joi';
import { IBoard } from '../../models/BoardModel';

export const boardValidator: Joi.ObjectSchema<IBoard> = Joi.object({
  title: Joi.string().max(30),
  createrId: Joi.string().hex().length(24).required(),
});

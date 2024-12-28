import { StatusCodes } from "http-status-codes";

export abstract class CustomError extends Error {
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype)
  }
  abstract statusCode: StatusCodes;
  abstract serialize(): { message: string }
 }

 export class ElementAdditionError extends CustomError {
  constructor(message: string){
    super(message);
  }
  statusCode: StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR;
  serialize() { 
    return {message: this.message}
  }
 }
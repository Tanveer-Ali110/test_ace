import HttpStatusCodes from 'http-status-codes';

export abstract class CustomError extends Error {
  public readonly HttpStatus = HttpStatusCodes.BAD_REQUEST;
  constructor(msg: string, httpStatus: number, name: string) {
    super(msg);
    this.HttpStatus = httpStatus;
    this.name = name
  }
}
export class ParamInvalidError extends CustomError {
  public static readonly HttpStatus = HttpStatusCodes.BAD_REQUEST;
  constructor(msg: string) {
    super(msg, ParamInvalidError.HttpStatus, "ParamInvalidError");
  }
}
export class InvalidDataError extends CustomError {
  public static readonly HttpStatus = HttpStatusCodes.BAD_REQUEST;
  constructor(msg: string) {
    super(msg, InvalidDataError.HttpStatus, "InvalidDataError");
  }
}
export class ValidationError extends CustomError {
  public static readonly HttpStatus = HttpStatusCodes.FORBIDDEN;
  constructor(msg: string) {
    super(msg, ValidationError.HttpStatus, "ValidationError");
  }
}
export class UserNotFoundError extends CustomError {
  public static readonly HttpStatus = HttpStatusCodes.NOT_FOUND;
  constructor(msg: string) {
    super(msg, UserNotFoundError.HttpStatus, "UserNotFoundError");
  }
}
export class UnauthorizedError extends CustomError {
  public static readonly HttpStatus = HttpStatusCodes.UNAUTHORIZED;
  constructor(msg: string) {
    super(msg, UnauthorizedError.HttpStatus, "UnauthorizedError");
  }
}
export const onError = (error: any) => {
  console.log("error", error.name)
  if (error?.name === "SequelizeUniqueConstraintError")
    throw new ValidationError(`${Object.keys(error?.fields)} already exist`)
  if (error?.name === "SequelizeValidationError")
    throw new ValidationError(`One or more of the required was missing or invalid.`)

  return error
};
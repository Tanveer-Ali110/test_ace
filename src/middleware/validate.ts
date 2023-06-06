import { Request, Response, NextFunction, RequestHandler } from 'express';
import { InvalidDataError, ParamInvalidError } from '@utils/error';
import { isEmpty, isUndefined } from 'lodash';
import { unauthorizedError } from '@utils/functions';

import jwt from "jsonwebtoken";
import Config from "@config/constant";

const { authSettings } = Config



export type TAll = string | number | boolean | null | undefined | object;


export const validate = (body: Array<string>, jwtToken: boolean): RequestHandler => (req: Request, res: Response, next: NextFunction) => {
  if (Object.keys(req.body).length < body.length) {
    throw new ParamInvalidError("One or more of the required was missing or invalid");
  }
  for (const field of body) {
    // If param is a string, make sure param is of type string on req.body
    if (typeof field === 'string') {
      const toValidate = req.body[field] as TAll
      if (typeof toValidate === "string") {
        if (isEmpty(toValidate.trim())) {
          throw new InvalidDataError(`${field} field must not be null`);
        }
      } else if (!toValidate) {
        throw new InvalidDataError(`${field} field must not be null`);
      }
    }
  }

  if (jwtToken) {
    validateSignIn(req, res, next)
  } else {
    next()
  }
}

export const validateSignIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!authSettings || !authSettings.secret)
    throw new Error("secret should be set");
  if (!authSettings.algorithms) throw new Error("algorithms should be set");
  if (!Array.isArray(authSettings.algorithms))
    throw new Error("algorithms must be an array");

  const hasBearer = hasBearerToken(req);

  let token: string;
  if (hasBearer) {
    const authorization =
      req.headers["authorization"] ?? req.headers.authorization ?? "";
    const parts = authorization.split(" ");
    if (parts.length === 2) {
      const scheme = parts[0];
      const credentials = parts[1];
      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      } else {
        return unauthorizedError(
          res,
          "Format is func-authorization: Bearer [token] or authorization: Bearer [token]"
        );
      }
    } else {
      return unauthorizedError(
        res,
        "Format is func-authorization: Bearer [token] or authorization: Bearer [token]"
      );
    }
  }

  try {
    const decodedToken = await new Promise<any>((resolve, reject) => {
      jwt.verify(
        token,
        authSettings.secret,
        (err: jwt.VerifyErrors | null, decoded: any) => {
          if (err) {
            reject(err.message);
          } else {
            resolve(decoded);
          }
        }
      );
    });

    req.body.userId = decodedToken.payload.id
    next();
    // return decodedToken?.payload;
  } catch (err: any) {
    return unauthorizedError(res, err?.message ?? "Invalid token");
  }
};

export const hasBearerToken = (req: Request) => {
  return (
    !isUndefined(req?.headers) &&
    !isUndefined(req.headers.authorization || req.headers["authorization"])
  );
};

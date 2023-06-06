import { Response } from "express";
import { isArray } from "lodash";
import HttpStatusCodes from 'http-status-codes';

// response Functions
export const success = <T>(res: Response, data?: T) => {
  return res.status(HttpStatusCodes.OK).json({ data });
};
// jsonObject Functions
export const toJsonObject = (value?: any) =>
  isArray(value) ? value?.map((v: { toJSON: () => any; }) => v.toJSON()) : value?.toJSON();

import { Response } from "express";

export const success = <T>(res: Response, data?: T) => {
  return res.status(200).json(data);
};
export const validataionError = (res: Response, error: string) => {
  return res.status(400).json(error);
};
export const tooManyRequest = (res: Response, error: string) => {
  return res.status(429).json(error);
};
export const unauthorizedError = (res: Response, error: string) => {
  return res.status(401).json(error);
};

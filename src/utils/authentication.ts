import bcrypt from "bcrypt";
import { isEmpty, isString } from "lodash";
import jwt from "jsonwebtoken";
import Config from "@config/constant";
import User from "@models/user.model";

const { authSettings } = Config
export const hashPassword = async (plaintext: string) => {
  if (isEmpty(plaintext)) return null;
  return bcrypt.hash(plaintext, 10); // Store hash in the database
};
// compare password
export const comparePassword = async (plaintext: string, hash: string) => {
  if (!isString(plaintext) || !isString(plaintext)) return null;
  return bcrypt.compare(plaintext, hash);
};

export const createAccessToken = async (user: User) => {
  const accessToken = await new Promise<string>((resolve, reject) => {
    if (user != null) {
      jwt.sign(
        {
          payload: {
            id: user.id,
            email: user.email,
          },
        },
        authSettings.secret,
        {
          algorithm: authSettings.algorithms[0],
        },
        (err: any, token: any) => {
          if (err) return reject(err);
          if (!token) return new Error("Empty token");
          return resolve(token);
        }
      );
    }
  });
  return accessToken;
};

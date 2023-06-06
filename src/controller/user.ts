import { Request, Response } from "express";
import { success } from "@utils/formatter";
import {
  createUser,
  findUserByEmail,
  findUserByPK,
} from "@services/user.service";
import { onError } from "@utils/error";
import { comparePassword, createAccessToken, hashPassword } from "@utils/authentication";
import { unauthorizedError, validataionError } from "@utils/functions";



const add = async (req: Request, res: Response) => {
  try {
    const hash = await hashPassword(req.body.password)
    const object = {
      name: req.body.name,
      email: req.body.email,
      password: hash
    }
    const user = await createUser(object);
    return success(res, user.toJSON());
  } catch (err) {
    onError(err)
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) return unauthorizedError(res, "emailAddress not found");

    const isCorrect = await comparePassword(password, user.toJSON().password);
    if (!isCorrect) return validataionError(res, "invalid password");

    const accessToken = await createAccessToken(user.toJSON());
    return success(res, { accessToken, user: user.toJSON() });
  } catch (error: any | unknown) {
    onError(error);
  }
}

const getById = async (req: Request, res: Response) => {
  try {
    const user = await findUserByPK(req.body.userId)
    return success(res, user);
  } catch (err) {
    console.log('err', err)
  }
}


export default { add, login, getById } as const

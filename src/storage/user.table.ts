/* eslint-disable import/prefer-default-export */
import { Sequelize } from "sequelize";
import { User } from "@models/index";
import { string, uint } from "./defaultTypes";

export const initUserModel = (sequelize: Sequelize) => {
  User.init(
    {
      name: string(false, {
        validate: { isLowercase: true },
      }),
      email: string(false, {
        unique: true,
        validate: {
          isEmail: true
        }
      }),
      password: string(true),
    },
    {
      modelName: "user",
      sequelize, // This bit is important
      timestamps: false,
    }
  );
};



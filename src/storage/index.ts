import { Sequelize } from "sequelize";
import Config from "@config/constant";
import { initUserModel } from "./user.table";

let sequelize: Sequelize | null = null;

const { databaseSetting } = Config

export const initSequelize = async (): Promise<Sequelize> => {
  if (sequelize !== null) return sequelize;

  sequelize = new Sequelize({
    database: databaseSetting.database,
    username: databaseSetting.username,
    password: databaseSetting.password,
    host: databaseSetting.host,
    port: parseInt(databaseSetting.port),
    logging: false,
    dialect: "mysql",
    pool: {
      max: 15,
      min: 5,
      idle: 5000,
      evict: 15000,
      acquire: 30000,
    },
  });

  initUserModel(sequelize);
  // Create new tables
  await sequelize.sync();

  return sequelize;
};

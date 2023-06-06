import jwt from 'jsonwebtoken'

/* eslint-disable node/no-process-env */
export default {
  nodeEnv: (process.env.NODE_ENV ?? ''),
  port: (process.env.PORT ?? 0),
  databaseSetting: {
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  },
  authSettings: {
    secret: (process.env.JWT_SECRET ?? ''),
    algorithms: [process.env.AuthAlgorithm ?? ('HS256' as const)] as jwt.Algorithm[],
    exp: (process.env.COOKIE_EXP ?? ''), // exp at the same time as the cookie
  },
} as const;

import express, { Application, NextFunction, Request, Response } from "express";
import 'express-async-errors';
import cookieParser from "cookie-parser";
import morgan from 'morgan';
import helmet from 'helmet';

import BaseRouter from "./routes";
import { CustomError } from "./utils/error";
import Config from "./config/constant";

// **** Init express **** //
const app: Application = express();
// **** Set basic express settings **** //
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Show routes called in console during development
if (Config.nodeEnv === 'development') {
  app.use(morgan('dev'));
}
// Security
if (Config.nodeEnv === 'production') {
  app.use(helmet());
}
// Add APIs
app.use("/api", BaseRouter);
// Setup error handler
app.use((err: Error | CustomError, _: Request, res: Response, __: NextFunction) => {
  const status = err instanceof CustomError ? err.HttpStatus : 500;
  return res.status(status).json({ error: err.message });
}
);
app.get("/", (_: Request, res: Response, __: NextFunction) => {
  res.send("Express server with TypeScript");
});
// **** Export default **** //
export default app;
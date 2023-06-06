import { Router } from 'express';
import userRouter from './userRoute'

const apiRouter = Router();


apiRouter.use('/user', userRouter);


export default apiRouter
import { Router } from "express";
import User from "@controller/user";
import { validate } from "@middleware/validate";


let body;
const userRouter = Router();

// Add one user
body = ["name", "email", "password"]
userRouter.post("/", validate(body, false), User.add);

body = ["email", "password"]
userRouter.post("/login", validate(body, false), User.login);

userRouter.get("/", validate([], true), User.getById)


export default userRouter;

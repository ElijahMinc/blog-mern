import { Router } from "express";

import AuthController from "../controllers/AuthController/AuthController";
import { validateUser } from '../middlewares/validateUser.middleware'
const authRouter = Router()

authRouter.post(AuthController.loginUrl, validateUser, AuthController.login)
authRouter.post(AuthController.registerUrl, validateUser, AuthController.register)



export default authRouter
import { Request, Response, Router } from "express";
import AuthController from "../controllers/AuthController/AuthController";
import { authValidator } from "../controllers/AuthController/Validator";
import corsMiddleware from "../middlewares/cors.middleware";

const authRouter = Router()

authRouter.post(AuthController.loginUrl, authValidator, AuthController.login)
authRouter.post(AuthController.registerUrl, authValidator, AuthController.register)



export default authRouter
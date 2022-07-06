import { Request, Response, Router } from "express";
import UserController from "../controllers/UserContoller/UserController";
import authMiddleware from "../middlewares/auth.middleware";
import corsMiddleware from "../middlewares/cors.middleware";


const userRouter = Router()


userRouter.get(UserController.getUserUrl, authMiddleware, corsMiddleware, UserController.getUser)

userRouter.post(UserController.createUserUrl, authMiddleware, corsMiddleware, UserController.createUser)
userRouter.put(UserController.setAvatarUrl, authMiddleware, corsMiddleware, UserController.setAvatar)
userRouter.delete(UserController.deleteAvatarUrl, authMiddleware, corsMiddleware, UserController.deleteAvatar)




export default userRouter
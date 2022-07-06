import { Request, Response, Router } from "express";
import CommentController from "../controllers/CommentController/CommentController";
import PostController from "../controllers/PostController/PostController";
import authMiddleware from "../middlewares/auth.middleware";
import corsMiddleware from "../middlewares/cors.middleware";


const commentRouter = Router()


commentRouter.get(CommentController.getAllCommentUrl, authMiddleware, corsMiddleware, CommentController.getAll)
commentRouter.get(CommentController.getAllCommentByPostIdUrl, authMiddleware, corsMiddleware, CommentController.getByPostId)

commentRouter.post(CommentController.createCommentUrl,authMiddleware, corsMiddleware,  CommentController.createComment)




export default commentRouter